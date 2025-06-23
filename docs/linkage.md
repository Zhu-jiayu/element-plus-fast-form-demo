# linkage 页面

## 效果预览

<DemoLinkage />

## 示例代码

### index.vue
```vue
<template>
  <h3>表单项联动示例</h3>
  <el-divider>hooks方法-表单项联动</el-divider>
  <FastForm />
  <el-space>
    <el-button @click="submit" type="primary">提交</el-button>
    <el-button @click="reset">重置</el-button>
  </el-space>

  <el-divider>自定义组件-表单项联动</el-divider>
  <FastFormB />
  <el-space>
    <el-button @click="submitB" type="primary">提交</el-button>
    <el-button @click="resetB">重置</el-button>
  </el-space>

  <el-divider>slot-表单项联动</el-divider>
  <FastFormC>
    <template #food="{ modelValue }">
      <el-select
        :model-value="modelValue"
        placeholder="请选择"
        @change="handleSelectChange"
      >
        <el-option
          v-for="item in foodOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>

    <template #type="{ modelValue }">
      <el-radio-group
        :model-value="modelValue"
        placeholder="请选择"
        @change="handleRadioChange"
      >
        <el-radio
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-radio-group>
    </template>
  </FastFormC>
  <el-space>
    <el-button @click="submitC" type="primary">提交</el-button>
    <el-button @click="resetC">重置</el-button>
  </el-space>
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form"; // 直接从源码引入

import { formConfigA, attrs, formConfigB, formConfigC } from "./config";
import { ElMessage } from "element-plus";
import { watch, ref } from "vue";

// hooks方法-表单项联动
const { FastForm, formValue, formRef, rawFormValue, setFormConfig } = useForm({
  ...attrs,
  formConfig: formConfigA,
});
const submit = () => {
  if (formRef.value) {
    formRef.value.validate((valid: boolean) => {
      if (valid) {
        ElMessage.warning("查看控制台");
        console.log({ rawFormValue });
      }
    });
  }
};
const reset = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
};

watch(
  () => formValue["food"],
  async (newVal) => {
    console.log("value changed:", newVal);
    if (newVal === "pork") {
      setFormConfig("type", {
        componentProps: {
          options: [
            { label: "bbq", value: "bbq" },
            { label: "水煮", value: "water" },
          ],
        },
        formItemProps: {
          rules: [
            {
              required: false,
              message: "请选择",
              trigger: "change",
            },
          ],
        },
        defaultValue: "bbq",
      });

      setFormConfig("package", {
        componentProps: {
          disabled: true,
        },
        defaultValue: "box",
      });
    } else {
      setFormConfig("type", {
        componentProps: {
          options: [
            { label: "bbq", value: "bbq" },
            { label: "水煮", value: "water" },
            { label: "油炸", value: "oil" },
            { label: "清蒸", value: "steam" },
          ],
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: "请选择",
              trigger: "change",
            },
          ],
        },
        defaultValue: "steam",
      });

      setFormConfig("package", {
        componentProps: {
          disabled: false,
        },
        defaultValue: "paper",
      });
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

// 自定义组件-表单项联动
const {
  FastForm: FastFormB,
  rawFormValue: rawFormValueB,
  formRef: formRefB,
} = useForm({
  ...attrs,
  formConfig: formConfigB,
});

const submitB = () => {
  if (formRefB.value) {
    formRefB.value.validate((valid: boolean) => {
      if (valid) {
        ElMessage.warning("查看控制台");
        console.log({ rawFormValueB });
      }
    });
  }
};
const resetB = () => {
  if (formRefB.value) {
    formRefB.value.resetFields();
  }
};

// slot-表单项联动

const foodOptions = ref([
  { label: "猪肉", value: "pork" },
  { label: "牛肉", value: "beef" },
]);
const typeOptions = ref([
  { label: "bbq", value: "bbq" },
  { label: "水煮", value: "water" },
]);
const {
  FastForm: FastFormC,
  rawFormValue: rawFormValueC,
  formRef: formRefC,
  setFormValue: setFormValueC,
} = useForm({
  ...attrs,
  formConfig: formConfigC,
});

const submitC = () => {
  if (formRefC.value) {
    formRefC.value.validate((valid: boolean) => {
      if (valid) {
        ElMessage.warning("查看控制台");
        console.log({ rawFormValueC });
      }
    });
  }
};
const resetC = () => {
  if (formRefC.value) {
    formRefC.value.resetFields();
  }
};

function handleSelectChange(value: string) {
  setFormValueC({
    food: value,
  });

  if (value === "beef") {
    setFormValueC({
      type: "bbq",
    });
  } else {
    setFormValueC({
      type: "water",
    });
  }
}

function handleRadioChange(value: string) {
  setFormValueC({
    type: value,
  });
}
</script>

```

### config.ts
```ts
import { defineAsyncComponent } from "vue";

// 新增表单样式配置
export const attrs = {
  colProps: {
    span: 6,
  },
  rowProps: {
    gutter: 24,
  },
  formProps: {
    "label-suffix": "：",
    "label-width": "auto",
    "label-position": "top",
  },
};

export const formConfigA = [
  {
    colProps: {
      soan: 12,
    },
    component: "el-select",
    defaultValue: "pork",
    formItemProps: {
      prop: "food",
      label: "食材",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "猪肉", value: "pork" },
        { label: "牛肉", value: "beef" },
      ],
    },
  },

  {
    colProps: {
      soan: 12,
    },
    // defaultValue: "water",
    component: "el-radio-group",
    formItemProps: {
      prop: "type",
      label: "烹饪方式",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "bbq", value: "bbq" },
        { label: "水煮", value: "water" },
      ],
    },
  },

  {
    colProps: {
      soan: 12,
    },
    component: "el-select",
    formItemProps: {
      prop: "package",
      label: "包装",
    },
    componentProps: {
      placeholder: "去选择",
      options: [
        { label: "纸包", value: "paper" },
        { label: "盒装", value: "box" },
      ],
    },
  },
];

export const formConfigB = [
  {
    component: defineAsyncComponent<any>(
      () => import("./components/Select/index.vue")
    ),
    formItemProps: {
      prop: "food",
      label: "食材",
    },
    defaultValue: "pork",
  },
  {
    colProps: {
      span: 6,
    },
    component: defineAsyncComponent<any>(
      () => import("./components/Radio/index.vue")
    ),
    formItemProps: {
      prop: "type",
      label: "烹饪方式",
    },
    defaultValue: "water",
  },
];

export const formConfigC = [
  {
    colProps: {
      soan: 12,
    },
    component: "slot",
    defaultValue: "pork",
    formItemProps: {
      prop: "food",
      label: "食材",
    },
  },

  {
    colProps: {
      soan: 12,
    },
    defaultValue: "water",
    component: "slot",
    formItemProps: {
      prop: "type",
      label: "烹饪方式",
    },
  },
];

```

