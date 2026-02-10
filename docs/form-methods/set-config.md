## 效果预览

<DemoSetFormConfig />

## 示例代码

::: code-group

```vue [index.vue]
<template>
  <h3>表单项增删改示例</h3>
  <FastForm />

  <el-space wrap>
    <el-button @click="submit" type="primary">提交</el-button>
    <el-button @click="reset">重置</el-button>
    <el-button @click="remove(true)">删除多个表单项(删除旧值)</el-button>
    <el-button @click="remove(false)">删除多个表单项(保留旧值)</el-button>
    <el-button @click="add">添加el-input2</el-button>
    <el-button @click="edit">修改el-cascader必填</el-button>
    <el-button @click="editNested">修改嵌套列表表单项</el-button>
    <el-button @click="setAllFormConfig(true)">替换整个表单(删除旧值)</el-button>
    <el-button @click="setAllFormConfig(false)">替换整个表单(保留旧值)</el-button>
  </el-space>

  <el-divider>嵌套表单操作示例</el-divider>
  <el-space>
    <el-button @click="addNestedField" type="success">向嵌套列表添加字段</el-button>
    <el-button @click="removeNestedFields(true)" type="danger">删除嵌套表单项(删除旧值)</el-button>
    <el-button @click="removeNestedFields(false)" type="danger">删除嵌套表单项(保留旧值)</el-button>
    <el-button @click="addToSecondGroup" type="info">添加部门选择字段</el-button>
  </el-space>
</template>

<script lang="ts" setup>
import { useForm } from "element-plus-fast-form";
import { watch } from "vue";
import { formConfig, attrs } from "./config";
import { ElMessage } from "element-plus";

const {
  FastForm,
  formValue,
  formRef,
  rawFormValue,
  removeFormConfig,
  addFormConfig,
  setFormConfig,
  setFormConfigs,
} = useForm({
  ...attrs,
  formConfig,
});
const submit = () => {
  if (formRef.value) {
    formRef.value.validate((valid: boolean) => {
      if (valid) {
        ElMessage.warning("查看控制台");
        console.log({ formValue, rawFormValue });
      }
    });
  }
};
const reset = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
};
function remove(isRemoveValue: boolean = true) {
  removeFormConfig(["el-input", "el-select", "el-select-multiple", "el-date-picker", "el-radio-group"], isRemoveValue);
  console.log("remove----formValue", formValue);
}
function add() {
  addFormConfig(
    {
      component: "el-input",
      formItemProps: {
        prop: "el-input2",
        label: "el-input2",
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
              if (/\w/.test(value)) {
                return callback(new Error("请输入非字母数字下划线字符"));
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
    undefined, // targetProp (不指定嵌套位置)
    1          // index (在顶层的第1个位置插入)
  );
}

function edit() {
  setFormConfig("el-cascader", {
    formItemProps: {
      rules: [
        {
          required: true,
          message: "请选择",
          trigger: "change",
        },
      ],
    },
  });
}

function editNested() {
  setFormConfig("children.0.el-input", {
    formItemProps: {
      label: '姓名'
    },
  });

  setFormConfig("children.0.el-radio-group", {
    formItemProps: {
      rules: [{ required: true, message: "请选择" }],
      label: '性别'
    },
  });
}

// 嵌套表单操作示例函数
function addNestedField() {
  // 向第一组（children.0）添加一个新的字段
  addFormConfig(
    {
      component: "el-input",
      formItemProps: {
        prop: "phone",
        label: "联系电话",
        rules: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "blur"
          }
        ]
      },
      componentProps: {
        placeholder: "请输入联系电话",
        maxlength: 11
      }
    },
    "children.0" // 指定添加到 children 数组的第0组
  );
  ElMessage.success("已向第一组添加联系电话字段");
}

function removeNestedFields(isRemoveValue: boolean = true) {
  // 删除嵌套表单中的多个字段
  removeFormConfig([
    "children.0.phone",        // 删除第一组的联系电话（如果之前添加过）
    "children.0.el-radio-group" // 删除第一组的单选框
  ], isRemoveValue);
  ElMessage.success("已删除指定的嵌套表单项");
  console.log("removeNestedFields----formValue", formValue);
}

function addToSecondGroup() {
  // 注意：这个示例假设children数组至少有两组数据
  // 实际使用时需要确保对应索引的组已存在
  // 这里我们先向第0组添加一个新字段作为示例
  addFormConfig(
    {
      component: "el-select",
      formItemProps: {
        prop: "department",
        label: "所属部门"
      },
      componentProps: {
        placeholder: "请选择所属部门",
        options: [
          { label: "技术部", value: "tech" },
          { label: "产品部", value: "product" },
          { label: "运营部", value: "operation" }
        ]
      }
    },
    "children.0" // 添加到 children 数组的第0组

  );
  ElMessage.success("已向表单组添加部门选择字段");
}

function setAllFormConfig(isRemoveValue: boolean = false) {
  setFormConfigs([
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
              if (/\w/.test(value)) {
                return callback(new Error("请输入非字母数字下划线字符"));
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
      defaultValue: '他'
    }], isRemoveValue);
}

watch(
  () => rawFormValue,
  (newValue) => {
    console.log("watch----rawFormValue", newValue);
  },
  { deep: true, immediate: true }
);

watch(
  () => formValue,
  (newValue) => {
    console.log("watch----formValue", newValue);
  },
  { deep: true, immediate: true }
);
</script>

```

```ts [config.ts]
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
            if (/\w/.test(value)) {
              return callback(new Error("请输入非字母数字下划线字符"));
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
    defaultValue: '我'
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
        { label: "男", value: "male" },
        { label: "女", value: "female" },
      ],
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
    },
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

  {
    formItemProps: {
      prop: "children",
      label: "children",
    },
    children: [
      [
        {
          component: "span",
          formItemProps: {},
          componentProps: {
            style: {
              fontSize: "18px",
              marginLeft: "-90px",
            },
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
      ],
    ],
  },
];

```

:::

