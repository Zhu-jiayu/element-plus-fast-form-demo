// 自动生成 VitePress 全局组件注册脚本
// 用法：node scripts/gen-vitepress-global-components.cjs

const fs = require('fs');
const path = require('path');

const viewsDir = path.resolve(__dirname, '../src/views');
const themeDir = path.resolve(__dirname, '../docs/.vitepress/theme');
const outputFile = path.join(themeDir, 'index.js');

function toPascalCase(str) {
  return str.replace(/(^|[-_/])(\w)/g, (_, __, c) => c ? c.toUpperCase() : '');
}

function getComponentList() {
  const components = [];
  fs.readdirSync(viewsDir).forEach(dir => {
    const compPath = path.join(viewsDir, dir, 'index.vue');
    if (fs.existsSync(compPath)) {
      const compName = 'Demo' + toPascalCase(dir);
      components.push({
        name: compName,
        importPath: `../../../src/views/${dir}/index.vue`
      });
    }
  });
  return components;
}

function genIndexJs(components) {
  const imports = [
    `import DefaultTheme from 'vitepress/theme'`,
    `import ElementPlus from 'element-plus'`,
    `import 'element-plus/dist/index.css'`
  ];
  components.forEach(c => {
    imports.push(`import ${c.name} from '${c.importPath}'`);
  });

  const enhanceApp = [
    'export default {',
    '  ...DefaultTheme,',
    '  enhanceApp({ app }) {',
    '    app.use(ElementPlus)',
    ...components.map(c => `    app.component('${c.name}', ${c.name})`),
    '  }',
    '}'
  ];

  return imports.join('\n') + '\n\n' + enhanceApp.join('\n');
}

const components = getComponentList();
const code = genIndexJs(components);
fs.writeFileSync(outputFile, code);
console.log('已自动生成 docs/.vitepress/theme/index.js');
