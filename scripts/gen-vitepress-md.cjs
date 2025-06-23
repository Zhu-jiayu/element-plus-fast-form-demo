// 自动生成 VitePress markdown 文档
// 用法：node scripts/gen-vitepress-md.cjs

const fs = require('fs');
const path = require('path');

const viewsDir = path.resolve(__dirname, '../src/views');
const docsDir = path.resolve(__dirname, '../docs');

function toPascalCase(str) {
  return str.replace(/(^|[-_/])(\w)/g, (_, __, c) => c ? c.toUpperCase() : '');
}

function genMarkdown({ dir, vueContent, jsFiles }) {
  const compName = 'Demo' + toPascalCase(dir);
  let md = `## 效果预览\n\n<${compName} />\n\n`;
  md += `## 示例代码\n\n`;
  if (vueContent) {
    md += '### index.vue\n';
    md += '```vue\n' + vueContent + '\n```\n\n';
  }
  jsFiles.forEach(f => {
    md += `### ${f.name}\n`;
    md += '```' + (f.ext === '.ts' ? 'ts' : 'js') + '\n' + f.content + '\n```\n\n';
  });
  return md;
}

fs.readdirSync(viewsDir).forEach(dir => {
  const dirPath = path.join(viewsDir, dir);
  if (!fs.statSync(dirPath).isDirectory()) return;
  const vuePath = path.join(dirPath, 'index.vue');
  let vueContent = '';
  if (fs.existsSync(vuePath)) {
    vueContent = fs.readFileSync(vuePath, 'utf-8');
  }
  // 查找同级 js/ts 文件
  const jsFiles = [];
  fs.readdirSync(dirPath).forEach(f => {
    const ext = path.extname(f);
    if ((ext === '.js' || ext === '.ts') && fs.statSync(path.join(dirPath, f)).isFile()) {
      jsFiles.push({
        name: f,
        ext,
        content: fs.readFileSync(path.join(dirPath, f), 'utf-8')
      });
    }
  });
  if (!vueContent && jsFiles.length === 0) return;
  const md = genMarkdown({ dir, vueContent, jsFiles });
  const mdPath = path.join(docsDir, dir + '.md');
  fs.writeFileSync(mdPath, md);
  console.log('已生成', mdPath);
});
