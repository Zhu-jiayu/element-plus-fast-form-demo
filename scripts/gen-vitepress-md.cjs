// 自动生成 VitePress markdown 文档，自动识别和包含引用的组件
// 用法：node scripts/gen-vitepress-md.cjs

const fs = require('fs');
const path = require('path');

const viewsDir = path.resolve(__dirname, '../src/views');
const srcDir = path.resolve(__dirname, '../src');
const docsDir = path.resolve(__dirname, '../docs');

function toPascalCase(str) {
  return str.replace(/(^|[-_/])(\w)/g, (_, __, c) => c ? c.toUpperCase() : '');
}

// 解析文件中的 import 语句，提取组件路径
function parseImports(content, basePath) {
  const imports = [];
  
  // 1. 匹配标准 import 语句：import ComponentName from './path' 或 import { ComponentName } from './path'
  const importRegex = /import\s+(?:(\w+)|{\s*([^}]+)\s*})\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const [, defaultImport, namedImports, importPath] = match;
    
    if (isLocalComponent(importPath)) {
      const resolvedPath = resolveImportPath(importPath, basePath);
      if (resolvedPath) {
        imports.push({
          path: resolvedPath,
          name: defaultImport || namedImports?.split(',')[0]?.trim(),
          importPath
        });
      }
    }
  }
  
  // 2. 匹配动态 import 语句：import("./path") 或 defineAsyncComponent(() => import("./path"))
  const dynamicImportRegex = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  while ((match = dynamicImportRegex.exec(content)) !== null) {
    const importPath = match[1];
    
    if (isLocalComponent(importPath)) {
      const resolvedPath = resolveImportPath(importPath, basePath);
      if (resolvedPath) {
        imports.push({
          path: resolvedPath,
          name: 'AsyncComponent',
          importPath
        });
      }
    }
  }
  
  return imports;
}

// 检查是否是本地组件路径
function isLocalComponent(importPath) {
  return importPath.startsWith('.') || 
         importPath.startsWith('@/components') ||
         (importPath.includes('/components/') && !importPath.includes('node_modules'));
}

// 解析相对路径到绝对路径
function resolveImportPath(importPath, basePath) {
  let resolvedPath;
  let possiblePaths = [];
  
  // 处理 @/ 别名 (指向 src 目录)
  if (importPath.startsWith('@/')) {
    const srcRelativePath = importPath.substring(2); // 去掉 '@/'
    if (srcRelativePath.endsWith('.vue')) {
      possiblePaths.push(path.resolve(srcDir, srcRelativePath));
    } else {
      possiblePaths.push(
        path.resolve(srcDir, srcRelativePath + '.vue'),
        path.resolve(srcDir, srcRelativePath, 'index.vue')
      );
    }
  } 
  // 处理相对路径
  else if (importPath.startsWith('.')) {
    if (importPath.endsWith('.vue')) {
      possiblePaths.push(path.resolve(basePath, importPath));
    } else {
      possiblePaths.push(
        path.resolve(basePath, importPath + '.vue'),
        path.resolve(basePath, importPath, 'index.vue')
      );
    }
  }
  // 处理包含 /components/ 的其他路径
  else if (importPath.includes('/components/')) {
    // 尝试在 src 目录下查找
    if (importPath.endsWith('.vue')) {
      possiblePaths.push(path.resolve(srcDir, importPath));
    } else {
      possiblePaths.push(
        path.resolve(srcDir, importPath + '.vue'),
        path.resolve(srcDir, importPath, 'index.vue')
      );
    }
  }
  
  // 找到第一个存在的文件
  resolvedPath = possiblePaths.find(p => fs.existsSync(p));
  
  return resolvedPath || null;
}

// 递归收集所有被引用的组件文件
function collectComponentFiles(filePath, collected = new Set()) {
  if (collected.has(filePath) || !fs.existsSync(filePath)) {
    return [];
  }
  
  collected.add(filePath);
  const files = [{
    path: filePath,
    content: fs.readFileSync(filePath, 'utf-8'),
    name: path.basename(filePath),
    relativePath: path.relative(srcDir, filePath)
  }];
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const basePath = path.dirname(filePath);
  const imports = parseImports(content, basePath);
  
  // 递归收集引用的组件
  imports.forEach(imp => {
    const subFiles = collectComponentFiles(imp.path, collected);
    files.push(...subFiles);
  });
  
  return files;
}

// 收集同级目录下的 JS/TS 文件
function collectJsFiles(dirPath) {
  const jsFiles = [];
  if (!fs.existsSync(dirPath)) return jsFiles;
  
  fs.readdirSync(dirPath).forEach(f => {
    const ext = path.extname(f);
    const fullPath = path.join(dirPath, f);
    if ((ext === '.js' || ext === '.ts') && fs.statSync(fullPath).isFile()) {
      jsFiles.push({
        name: f,
        ext,
        content: fs.readFileSync(fullPath, 'utf-8'),
        relativePath: path.relative(srcDir, fullPath)
      });
    }
  });
  
  return jsFiles;
}

function genMarkdown({ dir, vueContent, jsFiles, componentFiles }) {
  const compName = 'Demo' + toPascalCase(dir);
  let md = `## 效果预览\n\n<${compName} />\n\n`;
  
  // 收集所有需要显示的文件
  const allFiles = [];
  
  // 主 Vue 文件
  if (vueContent) {
    allFiles.push({
      name: 'index.vue',
      language: 'vue',
      content: vueContent
    });
  }
  
  // 配置文件（JS/TS）
  jsFiles.forEach(f => {
    allFiles.push({
      name: f.name,
      language: f.ext === '.ts' ? 'ts' : 'js',
      content: f.content
    });
  });
  
  // 引用的组件文件
  const nonConfigComponentFiles = componentFiles.filter(f => {
    // 跳过主文件（精确匹配主文件路径）
    if (f.relativePath === `views/${dir}/index.vue`) {
      return false;
    }
    
    // 跳过已经在jsFiles中显示的配置文件
    const isConfigFile = jsFiles.some(jsFile => 
      f.name === jsFile.name && f.relativePath.includes(`views/${dir}/`)
    );
    
    return !isConfigFile;
  });
  
  // 添加相关组件文件
  nonConfigComponentFiles.forEach(f => {
    // 根据文件扩展名确定代码块语言
    let language = 'vue';
    if (f.name.endsWith('.ts')) {
      language = 'ts';
    } else if (f.name.endsWith('.js')) {
      language = 'js';
    }
    
    allFiles.push({
      name: f.relativePath,
      language: language,
      content: f.content
    });
  });
  
  // 生成 code-group 格式的 markdown
  if (allFiles.length > 0) {
    md += '## 示例代码\n\n';
    md += '::: code-group\n\n';
    
    allFiles.forEach(file => {
      md += `\`\`\`${file.language} [${file.name}]\n`;
      md += file.content + '\n';
      md += '```\n\n';
    });
    
    md += ':::\n\n';
  }
  
  return md;
}

// 主要执行逻辑
fs.readdirSync(viewsDir).forEach(dir => {
  const dirPath = path.join(viewsDir, dir);
  if (!fs.statSync(dirPath).isDirectory()) return;
  
  const vuePath = path.join(dirPath, 'index.vue');
  let vueContent = '';
  let componentFiles = [];
  
  if (fs.existsSync(vuePath)) {
    vueContent = fs.readFileSync(vuePath, 'utf-8');
    
    // 收集Vue文件引用的组件
    componentFiles = collectComponentFiles(vuePath);
  }
  
  // 查找同级 js/ts 配置文件
  const jsFiles = collectJsFiles(dirPath);
  
  // 收集配置文件中引用的组件
  jsFiles.forEach(jsFile => {
    const jsPath = path.join(dirPath, jsFile.name);
    const jsComponentFiles = collectComponentFiles(jsPath);
    // 合并组件文件，避免重复
    jsComponentFiles.forEach(comp => {
      if (!componentFiles.find(existing => existing.path === comp.path)) {
        componentFiles.push(comp);
      }
    });
  });
  
  console.log(`[${dir}] 发现 ${componentFiles.length} 个组件文件`);
  
  // 打印发现的组件文件路径（调试用）
  componentFiles.forEach(f => {
    if (f.path !== vuePath) { // 不打印主文件
      console.log(`  - ${f.relativePath}`);
    }
  });
  

  
  if (!vueContent && jsFiles.length === 0) return;
  
  const md = genMarkdown({ dir, vueContent, jsFiles, componentFiles });
  const mdPath = path.join(docsDir, dir + '.md');
  fs.writeFileSync(mdPath, md);
  console.log(`已生成 ${mdPath}`);
});
