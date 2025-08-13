## 效果预览

<DemoFormlist />

## 示例代码

::: code-group

```vue [index.vue]
<template>
  <h3>表单列表</h3>
  <FastForm>
    <template #points2="{ formValue, nestedKey }">
      <el-input placeholder="请输入" v-model="formValue[nestedKey.prop][nestedKey.key].points2" />
    </template>
  </FastForm>

  <el-space>
    <el-button @click="add" type="primary">添加1个相同表单</el-button>
    <el-button @click="customeAdd" type="primary">添加1个不同表单</el-button>
    <el-button @click="remove" type="primary">删除第2个</el-button>
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

const { FastForm, formValue, formRef, addItem, removeItem, setFormDisabled, setFormValue } = useForm({
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

const add = () => {
  addItem("children");
};
const customeAdd = () => {
  addItem("children",
    [
      {
        component: "el-input",
        formItemProps: {
          prop: "input2",
          label: "输入框",
          rules: [
            {
              required: true,
              message: "请输入",
            },
          ],
        },
        componentProps: {
          placeholder: "请输入",
        },
      }

    ]);
};
const remove = () => {
  removeItem("children", 1);
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
    "label-width": "160",
    model: {
      "el-input": "123",
      children: [
        {
          "el-input": "123",
          "el-radio-group": "Y",
          "points2": "123",
        },
      ],
    },
  },
  showOperate: true,
};

// 新增表单配置
export const formConfig = [
  {
    component: "el-input",
    formItemProps: {
      prop: "el-input",
      label: "el-input",
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
            if (!/^\d+$/.test(value)) {
              return callback(new Error("请输入数字"));
            }
            callback();
          },
          trigger: ["change", "blur"],
        },
      ],
    },
    componentProps: {
      placeholder: "去输入",
    },
  },



  {
    formItemProps: {
      prop: "children",
      label: "children",
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
          defaultValue: "标题",
          colProps: {
            span: 24,
          },
        },
        {
          component: "el-input",
          formItemProps: {
            prop: "el-input",
            label: "el-input",
            rules: [
              {
                required: true,
                message: "请填写完整",
              },
            ],
          },
          componentProps: {
            placeholder: "去输入",
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
          component: "slot",
          formItemProps: {
            prop: "points2",
            label: "slot",
            rules: [
              {
                required: true,
                message: "请填写完整",
              },
            ],
          },
        },

        {
          colProps: {
            span: 24,
          },
          component: defineAsyncComponent<any>(
            () => import("../../components/Avatar-upload/index.vue")
          ),
          formItemProps: {
            prop: "avatar",
            label: "头像",
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

