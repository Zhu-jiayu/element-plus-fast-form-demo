import { defineConfig } from "vitepress";
import { resolve } from "path";

import fs from "fs";

// 转义Markdown中的尖括号，但保留代码块内容
function escapeMarkdownBrackets(markdownContent) {
  // 正则表达式模式：匹配代码块
  const codeBlockPattern = /```[\s\S]*?```|`[\s\S]*?`/g;

  // 临时替换代码块为占位符
  const codeBlocks = [];
  const contentWithoutCodeBlocks = markdownContent.replace(
    codeBlockPattern,
    (match) => {
      codeBlocks.push(match);
      return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
    }
  );

  // 转义普通文本中的尖括号
  const escapedContent = contentWithoutCodeBlocks
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 恢复代码块内容
  return escapedContent.replace(/__CODE_BLOCK_(\d+)__/g, (match, index) => {
    return codeBlocks[index];
  });
}

// Vite插件：在Markdown文件被处理前转义尖括号

const markdownBracketEscaper = {
  name: "markdown-bracket-escaper",
  enforce: "pre",
  async transform(code, id) {
    // 只处理Markdown文件
    if (!id.endsWith("index.md")) return null;

    try {
      // 读取原始文件内容
      const rawContent = await fs.promises.readFile(id, "utf-8");
      // 转义尖括号
      const escapedContent = escapeMarkdownBrackets(rawContent);
      return escapedContent;
    } catch (err) {
      console.error("Error processing Markdown file:", err);
      return code;
    }
  },
};

export default defineConfig({
  base: "/element-plus-fast-form-demo/", // 添加此行，如果部署到 GitHub Pages 的子目录
  title: "element-plus-fast-form 文档",
  description: "基于 Vue3 + Element Plus 的表单组件封装案例",
  appearance: false,
  themeConfig: {
    nav: [
      //   { text: '首页', link: '/useForm' },
    ],
    sidebar: [
      { text: "API文档 ", link: "/" },
      {
        text: '基础用法',
        items: [
          { text: 'element-plus组件', link: '/basic/element' },
          { text: '基础用法-slot插槽', link: '/basic/slot' },
          { text: '基础用法-自定义组件', link: '/basic/custom' },
          { text: '文本组件', link: '/basic/string' }
        ],
      },
      {
        text: '表单列表',
        items: [
          { text: '列表基础', link: '/formlist/base' },
          { text: '列表方法', link: '/formlist/list-methods' },
          { text: '操作按钮展示和位置', link: '/formlist/operate-display' },
          { text: '自定义操作按钮(组件)', link: '/formlist/custom' },
          { text: '自定义操作按钮(h函数)', link: '/formlist/custom-h' }
        ],
      },
      {
        text: '表单方法',
        items: [
          { text: '表单禁启用', link: '/form-methods/enable-disable' },
          { text: '设置组件属性', link: '/form-methods/dynamic-options' },
          { text: '表单项增删改', link: '/form-methods/set-config' }
        ],
      },
      {
        text: '表单项联动',
        items: [
          { text: 'hooks方法', link: '/linkage/hooks' },
          { text: '表单项联动-自定义组件', link: '/linkage/custom' },
          { text: '表单项联动-slot插槽', link: '/linkage/slot' }
        ],
      },
      {
        text: '其他表单场景',
        items: [
          { text: '表单默认值', link: '/other-scenarios/default-value' },
          { text: '异步表单', link: '/other-scenarios/async-form' },
          { text: '多表单实例', link: '/other-scenarios/multiple-form' }
        ],
      }
    ],

    outline: false,
    aside: false,
  },
  vite: {
    plugins: [markdownBracketEscaper],
    resolve: {
      alias: {
        "@": resolve(__dirname, "../../src"),
      },
    },
  },
});
