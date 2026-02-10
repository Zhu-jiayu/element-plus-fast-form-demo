## 效果预览

<DemoFormlist />

## 示例代码

::: code-group

```vue [index.vue]
<template>
  <h3>表单列表</h3>
  <FastForm>
    <template #points2="{ formValue, nestedKey, nestedProp, modelValue }">
      <el-input placeholder="请输入" v-model="formValue[nestedProp][nestedKey].points2" />
    </template>
  </FastForm>

  <el-space>
    <el-button @click="submit" type="primary">提交</el-button>
    <el-button @click="reset">重置</el-button>
    <el-button @click="setFormDisabled(false)">启用表单</el-button>
    <el-button @click="setFormDisabled(true)">禁用表单</el-button>
    <el-button @click="setFormVal">赋值</el-button>
  </el-space>
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";
import { formConfig, attrs } from "./config";
import { ElMessage } from "element-plus";

const { FastForm, formValue, formRef, setFormDisabled, setFormValue } = useForm({
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

const setFormVal = () => {
  setFormValue({
    "children": [
      {
        'el-input': '2', 'el-radio-group': null, points2: '3'
      }
    ]
  });
};
</script>

```

```ts [config.ts]
import { defineAsyncComponent, h } from "vue";
import AddButton from "./components/AddButton.vue";
import DeleteButton from "./components/DeleteButton.vue";

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
    model: {
      "el-input": "前端管理系统开发",
      children: [
        {
          "el-input": "张三",
          "el-radio-group": "leader",
          "points2": "负责前端架构设计",
        },
      ],
    },
  },
};

// 新增表单配置
export const formConfig = [
  {
    component: "el-input",
    formItemProps: {
      prop: "el-input",
      label: "项目名称",
      rules: [
        {
          required: true,
          message: "请输入项目名称",
        },
      ],
    },
    componentProps: {
      placeholder: "请输入项目名称",
    },
  },

  {
    formItemProps: {
      prop: "children",
      label: "项目成员",
    },
    children: [
      [
        {
          component: 'span',
          formItemProps: {
          },
          componentProps: {
            style: {
              fontSize: '18px',
              marginLeft: '-90px'
            }
          },
          defaultValue: "成员信息",
          colProps: {
            span: 24,
          },
        },
        {
          component: "el-input",
          formItemProps: {
            prop: "el-input",
            label: "成员姓名",
            rules: [
              {
                required: true,
                message: "请输入成员姓名",
              },
            ],
          },
          componentProps: {
            placeholder: "请输入成员姓名",
          },
        },
        {
          component: "el-radio-group",
          formItemProps: {
            prop: "el-radio-group",
            label: "角色类型",
          },
          componentProps: {
            placeholder: "请选择角色",
            options: [
              { label: "项目经理", value: "leader" },
              { label: "开发工程师", value: "developer" },
            ],
          },
        },

        {
          component: "slot",
          formItemProps: {
            prop: "points2",
            label: "工作职责",
            rules: [
              {
                required: true,
                message: "请输入工作职责",
              },
            ],
          },
        },

        {
          colProps: {
            span: 24,
          },
          component: defineAsyncComponent<any>(
            () => import("@/components/Avatar-upload/index.vue")
          ),
          formItemProps: {
            prop: "avatar",
            label: "头像上传",
          },
          componentProps: {},
        },
      ],
    ],
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

:::

