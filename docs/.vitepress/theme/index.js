import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import DemoCustom from '../../../src/views/custom/index.vue'
import DemoDefaultValue from '../../../src/views/defaultValue/index.vue'
import DemoDynamicOptions from '../../../src/views/dynamicOptions/index.vue'
import DemoFormEnableDisable from '../../../src/views/formEnableDisable/index.vue'
import DemoFormlist from '../../../src/views/formlist/index.vue'
import DemoFormlistButtonC from '../../../src/views/formlistButtonC/index.vue'
import DemoFormlistButtonH from '../../../src/views/formlistButtonH/index.vue'
import DemoFormlistListMethods from '../../../src/views/formlistListMethods/index.vue'
import DemoFormlistOperateDisplay from '../../../src/views/formlistOperateDisplay/index.vue'
import DemoLinkage from '../../../src/views/linkage/index.vue'
import DemoLinkage2 from '../../../src/views/linkage2/index.vue'
import DemoLinkage3 from '../../../src/views/linkage3/index.vue'
import DemoMultipleForm from '../../../src/views/multipleForm/index.vue'
import DemoSetFormConfig from '../../../src/views/setFormConfig/index.vue'
import DemoSetFormConfigs from '../../../src/views/setFormConfigs/index.vue'
import DemoSlot from '../../../src/views/slot/index.vue'
import DemoString from '../../../src/views/string/index.vue'
import DemoUseForm from '../../../src/views/useForm/index.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark')
    }
    app.use(ElementPlus)
    app.component('DemoCustom', DemoCustom)
    app.component('DemoDefaultValue', DemoDefaultValue)
    app.component('DemoDynamicOptions', DemoDynamicOptions)
    app.component('DemoFormEnableDisable', DemoFormEnableDisable)
    app.component('DemoFormlist', DemoFormlist)
    app.component('DemoFormlistButtonC', DemoFormlistButtonC)
    app.component('DemoFormlistButtonH', DemoFormlistButtonH)
    app.component('DemoFormlistListMethods', DemoFormlistListMethods)
    app.component('DemoFormlistOperateDisplay', DemoFormlistOperateDisplay)
    app.component('DemoLinkage', DemoLinkage)
    app.component('DemoLinkage2', DemoLinkage2)
    app.component('DemoLinkage3', DemoLinkage3)
    app.component('DemoMultipleForm', DemoMultipleForm)
    app.component('DemoSetFormConfig', DemoSetFormConfig)
    app.component('DemoSetFormConfigs', DemoSetFormConfigs)
    app.component('DemoSlot', DemoSlot)
    app.component('DemoString', DemoString)
    app.component('DemoUseForm', DemoUseForm)
  }
}