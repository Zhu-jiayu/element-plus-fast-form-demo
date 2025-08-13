新页面生成文档步骤
1. 拷贝fast-form项目views目录下新增页面
2. 修改新页面fast-form依赖的import
3. 修改src/router
4. 执行docs:components docs:sidebar docs:md
5. 更新readme.md docs/index.md
6. 修改vitepress/config.js sidebar添加入口/