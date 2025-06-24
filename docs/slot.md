## 效果预览

<DemoSlot />

## 示例代码

### index.vue
```vue
<template>
  <h3>slot插槽</h3>
  <FastForm>
    <template #points="{ formValue }">
      <el-row :gutter="4">
        <el-col :span="18">
          <el-input placeholder="请输入" v-model="formValue.points" />
        </el-col>
        <el-col :span="6">
          %
        </el-col>
      </el-row>
    </template>

    <template #select="{ formValue }">
      <el-row :gutter="6">
        <el-col :span="12">
          <el-select
            v-model="formValue.select"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option label="选项1" value="option1" />
            <el-option label="选项2" value="option2" />
            <el-option label="选项3" value="option3" />
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-input
            v-model="formValue.input2"
            placeholder="请输入"
            style="width: 100%"
          />
        </el-col>
      </el-row>
    </template>
  </FastForm>

  <el-space>
    <el-button @click="submit" type="primary">提交</el-button>
    <el-button @click="reset">重置</el-button>
  </el-space>
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";
import { formConfig, attrs } from "./config";
import { ElMessage } from "element-plus";

const { FastForm, formValue, formRef } = useForm({
  ...attrs,
  formConfig,
});

const submit = () => {
  if (formRef.value) {
    formRef.value.validate((valid: boolean) => {
      if (valid) {
        ElMessage.warning("查看控制台");
        console.log(formValue);
      }
    });
  }
};
const reset = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
};
</script>

```

### config.ts
```ts

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
    "label-width": "auto",
  },
};

// 新增表单配置
export const formConfig = [
  {
    component: "slot",
    formItemProps: {
      prop: "points",
      label: "points",
      rules: [
        {
          required: true,
          message: "请填写完整",
        },
      ],
    },
  },
  {
    component: "slot",
    formItemProps: {
      prop: "select",
      label: "select",
      rules: [
        {
          required: true,
          message: "请选择",
        },
      ],
    },
  },
];

```

