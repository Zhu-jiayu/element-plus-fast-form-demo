import { defineAsyncComponent, h, resolveComponent } from "vue";
import type { IOperateButtonProps } from "element-plus-fast-form";

// 使用 h 函数定义添加按钮（替代组件式的 AddButton.vue）
function renderAddButton(props: IOperateButtonProps) {
  return h(resolveComponent("el-button"), {
    type: "primary",
    onClick: props.onClick,
  }, "添加");
}

// 使用 h 函数定义删除按钮（替代组件式的 DeleteButton.vue）：仅当 length > 1 时渲染
function renderDeleteButton(props: IOperateButtonProps) {
  if (props.length !== undefined && props.length <= 1) {
    return null;
  }
  return h(resolveComponent("el-button"), {
    type: "danger",
    onClick: props.onClick,
  }, "删除");
}

// 表单样式与操作按钮配置（操作按钮通过 h 函数实现）
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
  showOperate: true,
  operatePosition: "tr",
  showOperateAdd: true,
  showOperateDelete: true,
  operateButtons: {
    addButton: renderAddButton,
    deleteButton: renderDeleteButton,
  },
};

// 表单配置（与 formlistButton 保持一致，便于对比）
export const formConfig = [
  {
    formItemProps: {
      prop: "children",
      label: "项目成员",
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
