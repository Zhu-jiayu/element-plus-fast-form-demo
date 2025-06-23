import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import { FrameworkConfig } from "./config";
import "element-plus/dist/index.css"; // 引入Element Plus默认样式

const app = createApp(App);

const frameworkConfig: FrameworkConfig = {
  elementOptions: {
    size: "default",
  },
  components: [],
  customStyles: {
    // ".my-custom-button": "background-color: #007bff; color: white;",
  },
};

// 注册Element Plus全局配置
app.use(ElementPlus, frameworkConfig.elementOptions);

// 动态注册组件
//   frameworkConfig.components.forEach((componentName) => {
//     const component = app.component(componentName);
//     if (component) {
//       app.component(componentName, component);
//     }
//   });

// 应用自定义样式
Object.entries(frameworkConfig.customStyles).forEach(([className, style]) => {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = `${className} { ${style} }`;
  document.head.appendChild(styleElement);
});


app.use(ElementPlus)
app.use(store).use(router);
app.mount("#app")
