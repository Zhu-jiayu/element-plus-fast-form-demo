import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import DemoCustom from '../../../src/views/custom/index.vue'
import DemoDynamicOptions from '../../../src/views/dynamicOptions/index.vue'
import DemoFormlist from '../../../src/views/formlist/index.vue'
import DemoLinkage from '../../../src/views/linkage/index.vue'
import DemoMultipleForm from '../../../src/views/multipleForm/index.vue'
import DemoSetFormConfig from '../../../src/views/setFormConfig/index.vue'
import DemoSlot from '../../../src/views/slot/index.vue'
import DemoUseForm from '../../../src/views/useForm/index.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus)
    app.component('DemoCustom', DemoCustom)
    app.component('DemoDynamicOptions', DemoDynamicOptions)
    app.component('DemoFormlist', DemoFormlist)
    app.component('DemoLinkage', DemoLinkage)
    app.component('DemoMultipleForm', DemoMultipleForm)
    app.component('DemoSetFormConfig', DemoSetFormConfig)
    app.component('DemoSlot', DemoSlot)
    app.component('DemoUseForm', DemoUseForm)
  }
}