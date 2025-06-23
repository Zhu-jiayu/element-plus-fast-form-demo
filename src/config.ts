export interface FrameworkConfig {
  elementOptions: {
    size?: "small" | "default" | "large";
    zIndex?: number;
    // ...其他Element Plus全局配置项
  };
  components: string[]; // 按需引入的Element Plus组件名称数组
  customStyles: Record<string, string>; // 自定义样式对象，键为类名，值为样式
}