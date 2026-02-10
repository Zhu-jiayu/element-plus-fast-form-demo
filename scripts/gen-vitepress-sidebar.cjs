// 自动从 src/router/index.ts 生成 VitePress sidebar 配置（支持多层目录）
const fs = require("fs");
const path = require("path");

const routerPath = path.resolve(__dirname, "../src/router/index.ts");
const vitepressConfigPath = path.resolve(
  __dirname,
  "../docs/.vitepress/config.js"
);

const routerContent = fs.readFileSync(routerPath, "utf-8");

// 跳过 redirect 等无 name 的项；只处理带 children 的父级路由
const sidebarGroups = [];

// 匹配：父级路由 path + name，且后面有 children: [
// 先找所有带 children 的父级块：path 以 / 开头，且块内有 children: [
const parentBlockRegex = /\{\s*path:\s*"\/([^"]+)",\s*name:\s*"([^"]+)"[\s\S]*?children:\s*\[/g;
let parentMatch;
const parentBlocks = [];
while ((parentMatch = parentBlockRegex.exec(routerContent)) !== null) {
  parentBlocks.push({
    pathPrefix: "/" + parentMatch[1],
    name: parentMatch[2],
    startIndex: parentMatch.index,
    blockStart: parentMatch.index + parentMatch[0].length,
  });
}

// 对每个父级块，找到对应的 children 数组内容（到 ], 为止）
for (let i = 0; i < parentBlocks.length; i++) {
  const parent = parentBlocks[i];
  const contentStart = parent.blockStart;
  let contentEnd = routerContent.length;
  if (i < parentBlocks.length - 1) {
    contentEnd = parentBlocks[i + 1].startIndex;
  }
  const blockContent = routerContent.slice(contentStart, contentEnd);
  const closingBracket = blockContent.indexOf("],");
  const childrenContent =
    closingBracket >= 0 ? blockContent.slice(0, closingBracket) : blockContent;

  // 在 children 内容里匹配每个子项 path + name
  const childRegex = /\{\s*path:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g;
  const items = [];
  let childMatch;
  while ((childMatch = childRegex.exec(childrenContent)) !== null) {
    const childPath = childMatch[1];
    const childName = childMatch[2];
    const fullPath = parent.pathPrefix + "/" + childPath;
    items.push(`          { text: '${childName}', link: '${fullPath}' }`);
  }
  if (items.length > 0) {
    sidebarGroups.push({
      text: parent.name,
      items: items.join(",\n"),
    });
  }
}

// 一级直接为：API文档 + 各路由分组（无「文档」「方法示例」包裹）
const routeGroupItems = sidebarGroups
  .map(
    (g) => `      {
        text: '${g.text}',
        items: [
${g.items}
        ],
      }`
  )
  .join(",\n");

const sidebarBlock = `      { text: "API文档 ", link: "/" },
${routeGroupItems}`;

// 读取 VitePress config.js，匹配整个 sidebar 块（贪婪匹配到最后一个 4 空格缩进的 ],）
let configContent = fs.readFileSync(vitepressConfigPath, "utf-8");
configContent = configContent.replace(
  /sidebar: \[[\s\S]*\n    \],/m,
  `sidebar: [\n${sidebarBlock}\n    ],`
);

fs.writeFileSync(vitepressConfigPath, configContent);

console.log("VitePress sidebar 已根据 router 多层目录自动生成！");
