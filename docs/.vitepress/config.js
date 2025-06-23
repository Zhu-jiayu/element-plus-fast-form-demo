import { defineConfig } from 'vitepress'
import { resolve } from 'path'

export default defineConfig({
  title: 'element-plus-fast-form 文档',
  description: '基于 Vue3 + Element Plus 的表单组件封装案例',
  themeConfig: {
    nav: [
    //   { text: '首页', link: '/useForm' },
    ],
    sidebar: [
      { text: '方法示例', items: [
        { text: '基础用法', link: '/useForm' },
        { text: 'slot插槽', link: '/slot' },
        { text: '自定义组件', link: '/custom' },
        { text: '嵌套表单', link: '/formlist' },
        { text: '多表单实例', link: '/multipleForm' },
        { text: '动态组件属性', link: '/dynamicOptions' },
        { text: '表单项增删改', link: '/setFormConfig' },
        { text: '表单项联动', link: '/linkage' }
      ]}
    ],
    outline: false
  },
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../src')
      }
    }
  }
})
