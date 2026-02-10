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
