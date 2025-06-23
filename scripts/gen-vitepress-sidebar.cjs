// 自动从 src/router/index.ts 生成 VitePress sidebar 配置
const fs = require('fs')
const path = require('path')

const routerPath = path.resolve(__dirname, '../src/router/index.ts')
const vitepressConfigPath = path.resolve(__dirname, '../docs/.vitepress/config.js')

const routerContent = fs.readFileSync(routerPath, 'utf-8')

// 匹配 routes 配置
const routeRegex = /\{\s*path:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g
let match
const items = []
while ((match = routeRegex.exec(routerContent)) !== null) {
  const path = match[1] === '/' ? '/useForm' : match[1]
  const name = match[2]
  items.push(`        { text: '${name}', link: '${path}' }`)
}

const sidebarBlock = `      { text: '方法示例', items: [
${items.join(',\n')}
      ]}`

// 读取 VitePress config.js
let configContent = fs.readFileSync(vitepressConfigPath, 'utf-8')
// 替换 sidebar
configContent = configContent.replace(/sidebar: \[[\s\S]*?\],/m, `sidebar: [\n${sidebarBlock}\n    ],`)

fs.writeFileSync(vitepressConfigPath, configContent)

console.log('VitePress sidebar 已根据 router 自动生成！')
