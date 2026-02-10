// 自动生成 VitePress markdown 文档，自动识别和包含引用的组件
// 用法：node scripts/gen-vitepress-md.cjs

const fs = require('fs');
const path = require('path');

const viewsDir = path.resolve(__dirname, '../src/views');
const srcDir = path.resolve(__dirname, '../src');
const docsDir = path.resolve(__dirname, '../docs');
const routerPath = path.resolve(__dirname, '../src/router/index.ts');

/**
 * 从 router 中解析出「文档路径 → view 目录」映射，与 sidebar 一致，避免 404
 * 返回 [{ routePath: 'basic/element', viewDir: 'useForm' }, ...]
 */
function parseRouterToDocRoutes() {
  const routerContent = fs.readFileSync(routerPath, 'utf-8');
  const entries = [];
  const parentRegex = /\{\s*path:\s*"(\/[^"]+)",\s*name:\s*"[^"]+"[\s\S]*?children:\s*\[/g;
  let parentMatch;
  const parents = [];
  while ((parentMatch = parentRegex.exec(routerContent)) !== null) {
    parents.push({
      pathPrefix: parentMatch[1].replace(/^\//, ''), // 去掉开头的 /
      startIndex: parentMatch.index,
      blockStart: parentMatch.index + parentMatch[0].length,
    });
  }
  for (let i = 0; i < parents.length; i++) {
    const parent = parents[i];
    const contentEnd = i < parents.length - 1 ? parents[i + 1].startIndex : routerContent.length;
    const blockContent = routerContent.slice(parent.blockStart, contentEnd);
    const closing = blockContent.indexOf('],');
    const childrenContent = closing >= 0 ? blockContent.slice(0, closing) : blockContent;
    const childRegex = /\{\s*path:\s*"([^"]+)",\s*name:\s*"[^"]+",[\s\S]*?import\s*\([^)]*["']\.\.\/views\/([^/"']+)\//g;
    let childMatch;
    while ((childMatch = childRegex.exec(childrenContent)) !== null) {
      const childPath = childMatch[1];
      const viewDir = childMatch[2];
      const routePath = parent.pathPrefix ? `${parent.pathPrefix}/${childPath}` : childPath;
      entries.push({ routePath, viewDir });
    }
  }
  return entries;
}

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

// 主要执行逻辑：按路由映射生成文档，路径与 sidebar 一致，避免 404
const docRoutes = parseRouterToDocRoutes();
console.log(`从 router 解析到 ${docRoutes.length} 个文档路由\n`);

docRoutes.forEach(({ routePath, viewDir }) => {
  const dir = viewDir;
  const dirPath = path.join(viewsDir, dir);
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    console.warn(`[${routePath}] 跳过：views/${dir} 不存在`);
    return;
  }

  const vuePath = path.join(dirPath, 'index.vue');
  let vueContent = '';
  let componentFiles = [];

  if (fs.existsSync(vuePath)) {
    vueContent = fs.readFileSync(vuePath, 'utf-8');
    componentFiles = collectComponentFiles(vuePath);
  }

  const jsFiles = collectJsFiles(dirPath);
  jsFiles.forEach(jsFile => {
    const jsPath = path.join(dirPath, jsFile.name);
    const jsComponentFiles = collectComponentFiles(jsPath);
    jsComponentFiles.forEach(comp => {
      if (!componentFiles.find(existing => existing.path === comp.path)) {
        componentFiles.push(comp);
      }
    });
  });

  if (!vueContent && jsFiles.length === 0) return;

  const md = genMarkdown({ dir, vueContent, jsFiles, componentFiles });
  const mdFilePath = path.join(docsDir, routePath + '.md');
  const mdDir = path.dirname(mdFilePath);
  if (!fs.existsSync(mdDir)) {
    fs.mkdirSync(mdDir, { recursive: true });
  }
  fs.writeFileSync(mdFilePath, md);
  console.log(`已生成 ${routePath}.md <- views/${dir}`);
});
