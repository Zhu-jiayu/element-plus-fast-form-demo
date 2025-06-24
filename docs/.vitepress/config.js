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
  themeConfig: {
    nav: [
      //   { text: '首页', link: '/useForm' },
    ],
    sidebar: [
      { text: "文档", items: [{ text: "使用说明", link: "/" }] },
      {
        text: "方法示例",
        items: [
          { text: "基础用法", link: "/useForm" },
          { text: "slot插槽", link: "/slot" },
          { text: "自定义组件", link: "/custom" },
          { text: "嵌套表单", link: "/formlist" },
          { text: "多表单实例", link: "/multipleForm" },
          { text: "动态组件属性", link: "/dynamicOptions" },
          { text: "表单项增删改", link: "/setFormConfig" },
          { text: "表单项联动", link: "/linkage" },
        ],
      },
    ],
    outline: false,
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
