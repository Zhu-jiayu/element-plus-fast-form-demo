## 效果预览

<DemoCustom />

## 示例代码

::: code-group

```vue [index.vue]
<template>
  <h3>自定义组件</h3>
  <FastForm />

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

```ts [config.ts]
import { defineAsyncComponent } from "vue";

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
    component: defineAsyncComponent<any>(
      () => import("@/components/Avatar-upload/index.vue")
    ),
    formItemProps: {
      prop: "avatar",
      label: "头像",
    },
    componentProps: {},
  },
  {
    component: defineAsyncComponent<any>(
      () => import("@/components/Select/index.vue")
    ),
    formItemProps: {
      prop: "select",
      label: "select",
    },
    defaultValue: "female",
  },
  {
 
    component: defineAsyncComponent<any>(
      () => import("@/components/Radio/index.vue")
    ),
    formItemProps: {
      prop: "radio-group",
      label: "radio-group",
    },
    defaultValue: "A",
  },
];

```

```vue [components/Avatar-upload/index.vue]
<template>
  <el-upload
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref, defineProps, watch, defineEmits } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

import type { UploadProps } from "element-plus";
const imageUrl = ref("");

const props = defineProps({
  formValue: { // 表单数据
    type: Object,
  },
  modelValue: { // 当前组件数据
    type: String,
    default: "",
  },
  prop: {
    type: String,
  },
});

watch(
  () => props.modelValue,
  () => {
    // 重置表单时，赋值
    imageUrl.value = props.modelValue
  }
);

const emits = defineEmits(["update:modelValue"]);

const getImageInfo = (file: any): Promise<string> => {
  let fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  return new Promise((resolve) => {
    fileReader.onload = function (e) {
      let base64 = this.result;
      resolve(base64 as string);
    };
  });
};


const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = async (rawFile) => {
  if (!["image/jpeg", "image/jpg", "image/png"].includes(rawFile.type)) {
    ElMessage.error("请传图片");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }

  // mock start
  const filedata: string = await getImageInfo(rawFile);
  imageUrl.value = filedata;
  emits("update:modelValue", filedata);
  // mock end

  return true;
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 80px;
  height: 80px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  text-align: center;
}
</style>

```

```vue [components/Select/index.vue]
<template>
  <el-select
    :model-value="props.modelValue"
    placeholder="请选择"
    @change="handleSelectChange"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script lang="ts" setup>
import { ref, defineProps, onUpdated, defineEmits } from "vue";

const options = ref([
  { label: "男", value: "male" },
  { label: "女2", value: "female" },
]);
const props = defineProps({
  formValue: {
    type: Object,
    default: () => ({}),
  },
  modelValue: {
    // 当前组件数据
    type: String,
    default: "",
  },
  prop: {
    type: String,
  },
  // 用于设置表单项的值
  setFormValue: {
    type: Function,
    default: () => void 0,
  },
});
const emits = defineEmits(["update:modelValue"]);

function handleSelectChange(value: string) {
  emits("update:modelValue", value);
  console.log(props, "++");

  if (value === "male") {
    props.setFormValue({
      radio: "B",
    });
  } else {
    props.setFormValue({
      radio: "A",
    });
  }
}
onUpdated(() => {
  console.log("Select组件 updated, 当前值:", props.modelValue);
});
</script>

```

```vue [components/Radio/index.vue]
<template>
  <el-radio-group
    :model-value="props.modelValue"
    placeholder="请选择"
    @change="handleSelectChange"
  >
    <el-radio
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-radio-group>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, onUpdated } from "vue";

const options = ref([
  { label: "A", value: "A" },
  { label: "B", value: "B" },
]);
const props = defineProps({
  formValue: {
    type: Object,
    default: () => ({}),
  },
  modelValue: {
    // 当前组件数据
    type: String,
    default: "",
  },
  prop: {
    type: String,
  },
});
const emits = defineEmits(["update:modelValue"]);

function handleSelectChange(value: string) {
  emits("update:modelValue", value);
}


// 观察组件更新
onUpdated(() => {
  console.log("Radio组件 updated, 当前值:", props.modelValue);
});
</script>

```

:::

