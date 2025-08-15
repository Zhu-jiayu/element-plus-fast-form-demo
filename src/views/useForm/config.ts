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
    "disabled": true,
  },
};

// 新增表单配置
export const formConfig = [
  {
    component: "el-input",
    formItemProps: {
      prop: "el-input",
      label: "绩效评分",
      rules: [
        {
          required: true,
          message: "请填写绩效评分",
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
      placeholder: "请输入0-100分",
    },
    suffix: "%",
  },

  {
    component: "el-select",
    formItemProps: {
      prop: "el-select",
      label: "所属部门",
    },
    componentProps: {
      placeholder: "请选择部门",
      options: [
        { label: "技术部", value: "tech" },
        { label: "产品部", value: "product" },
        { label: "运营部", value: "operation" },
        { label: "市场部", value: "marketing" },
        { label: "人事部", value: "hr" },
      ],
      filterable: true,
    },
  },
  {
    component: "el-select-v2",
    formItemProps: {
      prop: "el-select2",
      label: "工作城市",
    },
    componentProps: {
      placeholder: "请选择工作城市",
      options: moreOptions,
      filterable: true,
    },
  },
  {
    component: "el-cascader",
    formItemProps: {
      prop: "el-cascader",
      label: "户籍地址",
    },
    componentProps: {
      placeholder: "请选择省市",
      options: [
        {
          label: "广东省",
          value: "guangdong",
          children: [
            {
              label: "深圳市",
              value: "shenzhen",
            },
            {
              label: "广州市",
              value: "guangzhou",
            },
            {
              label: "珠海市",
              value: "zhuhai",
            },
          ],
        },
        {
          label: "浙江省",
          value: "zhejiang",
          children: [
            {
              label: "杭州市",
              value: "hangzhou",
            },
            {
              label: "宁波市",
              value: "ningbo",
            },
            {
              label: "温州市",
              value: "wenzhou",
            },
          ],
        },
        {
          label: "江苏省",
          value: "jiangsu",
          children: [
            {
              label: "南京市",
              value: "nanjing",
            },
            {
              label: "苏州市",
              value: "suzhou",
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
      label: "技能标签",
    },
    componentProps: {
      placeholder: "请选择技能",
      multiple: true,
      options: [
        { label: "JavaScript", value: "javascript" },
        { label: "TypeScript", value: "typescript" },
        { label: "Vue.js", value: "vue" },
        { label: "React", value: "react" },
        { label: "Node.js", value: "nodejs" },
        { label: "Python", value: "python" },
        { label: "Java", value: "java" },
        { label: "Go", value: "go" },
      ],
    },
  },
  {
    component: "el-radio-group",
    formItemProps: {
      prop: "el-radio-group",
      label: "性别",
    },
    componentProps: {
      placeholder: "请选择性别",
      options: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
      ],
    },
  },
  {
    component: "el-checkbox-group",
    formItemProps: {
      prop: "el-checkbox-group",
      label: "兴趣爱好",
    },
    componentProps: {
      placeholder: "请选择兴趣爱好",
      options: [
        { label: "阅读", value: "reading" },
        { label: "运动", value: "sports" },
        { label: "音乐", value: "music" },
        { label: "旅行", value: "travel" },
        { label: "摄影", value: "photography" },
        { label: "游戏", value: "gaming" },
      ],
    },
  },
  {
    component: "el-input-number",
    formItemProps: {
      prop: "el-input-number",
      label: "年龄",
    },
    componentProps: {
      placeholder: "请输入年龄",
      min: 18,
      max: 65,
      precision: 0,
      "controls-position": "right",
      style: { width: "100%" },
    },
    suffix: "岁",
  },
  {
    component: "el-date-picker",
    formItemProps: {
      prop: "el-date-picker",
      label: "入职日期",
    },
    componentProps: {
      placeholder: "请选择入职日期",
      type: "date",
      "value-format": "YYYY-MM-DD",
    },
  },
  {
    component: "el-tree-select",
    formItemProps: {
      prop: "el-tree-select",
      label: "办公地点",
    },
    componentProps: {
      placeholder: "请选择办公地点",
      data: [
        {
          value: "beijing",
          label: "北京总部",
          children: [
            {
              value: "chaoyang",
              label: "朝阳科技园",
            },
            {
              value: "haidian",
              label: "海淀研发中心",
            },
          ],
        },
        {
          value: "shanghai",
          label: "上海分公司",
          children: [
            {
              value: "pudong",
              label: "浦东办公区",
            },
            {
              value: "huangpu",
              label: "黄浦商务区",
            },
          ],
        },
        {
          value: "shenzhen",
          label: "深圳分公司",
          children: [
            {
              value: "nanshan",
              label: "南山科技园",
            },
            {
              value: "futian",
              label: "福田CBD",
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
      label: "上班时间",
    },
    componentProps: {
      placeholder: "请选择上班时间",
      "value-format": "HH:mm:ss",
    },
  },
];
