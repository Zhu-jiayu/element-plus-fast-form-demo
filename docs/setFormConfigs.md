## 效果预览

<DemoSetFormConfigs />

## 示例代码

::: code-group

```vue [index.vue]
<template>
  <h3>异步表单示例</h3>
  <el-divider>setFormConfigs 配置</el-divider>
  <div v-if="count > 0">{{ count }}s后渲染表单</div>

  <FastForm1 />
  <el-divider>响应式数据配置</el-divider>

  <div v-if="count2 > 0">{{ count2 }}s后渲染表单</div>

  <FastForm2 />
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";

import { ref, reactive } from "vue";
import { formConfig, attrs } from "./config";


const {
  FastForm: FastForm1,
  setFormConfigs
} = useForm({
  ...attrs,
  formConfig: []
});
const count = ref(3);

const timer = setInterval(() => {
  count.value--;
  if (count.value === 0) {
    clearInterval(timer);
    setFormConfigs(formConfig);
  }
}, 1000);



const formConfig2 = reactive({
  ...attrs,
  formConfig: []
});
const {
  FastForm: FastForm2,
} = useForm(formConfig2);

const count2 = ref(5);

const timer2 = setInterval(() => {
  count2.value--;
  if (count2.value === 0) {
    clearInterval(timer2);
    formConfig2.formConfig = formConfig;
  }
}, 1000);
</script>

```

```ts [config.ts]
const cities = [
  "北京", "上海", "广州", "深圳", "杭州", "南京", "苏州", "成都", "重庆", "武汉",
  "西安", "青岛", "大连", "宁波", "厦门", "福州", "济南", "郑州", "长沙", "合肥",
  "沈阳", "哈尔滨", "长春", "石家庄", "太原", "呼和浩特", "兰州", "银川", "西宁", "乌鲁木齐"
];
const moreOptions = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${cities[idx % cities.length]}-${Math.floor(idx / cities.length) + 1}`,
  label: `${cities[idx % cities.length]}${Math.floor(idx / cities.length) > 0 ? `-${Math.floor(idx / cities.length) + 1}区` : ''}`,
}));

// 新增表单样式配置
export const attrs = {
  colProps: {
    span: 12,
  },
  rowProps: {
    gutter: 24,
  },
  formProps: {
    "label-position": "right",
    "label-suffix": "：",
    "label-width": "160",
  },
};

// 新增表单配置
export const formConfig = [
  {
    component: "el-input",
    defaultValue: "92",
    formItemProps: {
      prop: "el-input",
      label: "客户满意度",
      rules: [
        {
          required: true,
          message: "请填写完整",
        },
        {
          validator: (
            _rule: any,
            value: string,
            callback: (arg0?: Error | undefined) => void
          ) => {
            if (!/\d/.test(value)) {
              return callback(new Error("请输入数字"));
            }
            callback();
          },
          trigger: ["change", "blur"],
        },
      ],
    },
    componentProps: {
      placeholder: "请输入满意度(1-100)",
    },
    suffix: "%",
  },

  {
    component: "el-select",
    formItemProps: {
      prop: "el-select",
      label: "el-select",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
      ],
      filterable: true,
    },
  },
  {
    component: "el-select-v2",
    formItemProps: {
      prop: "el-select2",
      label: "虚拟化下拉",
    },
    componentProps: {
      placeholder: "去选择",
      options: moreOptions,
      filterable: true,
    },
  },
  {
    component: "el-cascader",
    formItemProps: {
      prop: "el-cascader",
      label: "el-cascader",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        {
          label: "艺术",
          value: "艺术",
          children: [
            {
              label: "音乐",
              value: "1-1",
            },
            {
              label: "绘画",
              value: "1-2",
            },
          ],
        },
        {
          label: "体育",
          value: "2",
          children: [
            {
              label: "足球",
              value: "2-1",
            },
            {
              label: "拳击",
              value: "2-2",
            },
          ],
        },
      ],
    },
  },
  {
    component: "el-select",
    formItemProps: {
      prop: "el-select-multiple",
      label: "el-select-multiple",
    },
    componentProps: {
      placeholder: "去选择",
      multiple: true,
      options: [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
      ],
    },
  },
  {
    component: "el-radio-group",
    formItemProps: {
      prop: "el-radio-group",
      label: "el-radio-group",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "是", value: "Y" },
        { label: "否", value: "N" },
      ],
    },
  },
  {
    component: "el-checkbox-group",
    formItemProps: {
      prop: "el-checkbox-group",
      label: "el-checkbox-group",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
      ],
    },
  },
  {
    component: "el-input-number",
    formItemProps: {
      prop: "el-input-number",
      label: "el-input-number",
    },
    componentProps: {
      placeholder: "去输入",
      min: 1,
      max: 99,
      precision: 0,
      "controls-position": "right",
      style: { width: "100%" },
    },
    suffix: "元",
  },
  {
    component: "el-date-picker",
    formItemProps: {
      prop: "el-date-picker",
      label: "el-date-picker",
    },
    componentProps: {
      placeholder: "去输入",
      type: "date",
    },
  },
  {
    component: "el-tree-select",
    formItemProps: {
      prop: "el-tree-select",
      label: "el-tree-select",
    },
    componentProps: {
      placeholder: "去选择",
      data: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "chaoyang",
              label: "朝阳",
            },
            {
              value: "tongzhou",
              label: "通州",
            },
          ],
        },
        {
          value: "xiamen",
          label: "厦门",
          children: [
            {
              value: "jimei",
              label: "集美",
            },
            {
              value: "huli",
              label: "湖里",
            },
          ],
        },
      ],
    },
  },
  {
    component: "el-time-picker",
    formItemProps: {
      prop: "el-time-picker",
      label: "el-time-picker",
    },
    componentProps: {
      placeholder: "去选择",
    },
  },
];

```

:::

