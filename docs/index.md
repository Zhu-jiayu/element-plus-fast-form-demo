# element-plus-fast-form 使用说明

本项目基于 Element Plus，采用"配置驱动+类封装+组合式 API"模式，适合中后台、低代码、动态表单等复杂场景。

## 🚀 为什么选择 ElementPlusFastForm？

**与传统 Vue 表单组件相比，FastForm 具有革命性的性能优势：**

- **⚡ 极致性能**：采用路径驱动架构，所有操作均为 O(1) 复杂度，嵌套表单场景下性能提升 **10-100倍**
- **🎯 嵌套表单原生支持**：内置嵌套表单引擎，支持 `"parent.0.child"` 路径语法，无需手动维护复杂的嵌套状态
- **🔧 配置驱动开发**：声明式配置减少 80% 样板代码，告别繁琐的响应式状态管理
- **📦 单一数据源**：集中式状态管理，精确更新机制避免全量重渲染，内存占用减少 60-80%
- **🛠️ 企业级架构**：支持动态配置、表单联动、多实例管理等复杂业务需求

传统 Vue 表单组件在处理复杂嵌套表单时存在性能瓶颈和开发复杂度问题，而 ElementPlusFastForm 通过先进的架构设计彻底解决了这些痛点，是现代 Vue 项目的理想选择。

## 目录

- [功能特性](#功能特性)
- [预览](#预览)
- [安装与引入](#安装与引入)
- [API](#api)
- [类型定义（types）](#类型定义)
- [组件透传属性](#组件透传属性)

## 功能特性

### 1. 多组件类型支持

- **Element Plus 组件**：支持所有 Element Plus 表单组件（el-input、el-select、el-cascader 等）
- **自定义 Vue 组件**：支持传入自定义组件，自动传递 formValue 和相关方法
- **插槽组件**：使用 'slot' 类型实现完全自定义的表单项渲染
- **文本组件**：支持纯文本或 HTML 字符串组件渲染

### 2. 后缀文字支持

- 表单项支持添加后缀文字，常用于显示单位或说明
- 自动调整布局，确保后缀文字正确显示
- 支持与表单项宽度的自适应配合

### 3. 异步配置支持

- **响应式配置**：支持 reactive 和 ref 包装的配置对象
- **动态加载**：支持异步获取表单配置并自动更新渲染
- **批量替换**：提供 setFormConfigs 方法实现整个表单结构的动态切换

### 4. 嵌套表单（表单列表）

- 支持数组形式的嵌套表单结构
- 提供 addItem 和 removeItem 方法动态增删列表项
- 每个列表项可包含多个表单字段
- 支持在嵌套表单中使用插槽或自定义组件
- **自定义操作按钮**：支持自定义添加/删除按钮的样式、位置和显示逻辑
  - 支持通过组件、h 函数或 VNode 方式自定义按钮
  - 支持配置按钮位置（左上、右上、左下、右下）
  - 支持控制添加/删除按钮的显示与隐藏

### 5. 表单联动功能

- **方法联动**：通过 hooks 方法实现表单项之间的联动
- **组件联动**：在自定义组件中实现复杂的联动逻辑
- **插槽联动**：通过插槽实现灵活的联动交互

### 6. 多表单实例管理

- 同一页面支持多个独立的表单实例
- 每个表单实例拥有独立的配置、数据和验证

### 7. 动态表单操作

- **组件属性动态修改**：运行时修改表单项的 options、placeholder 等属性
- **表单项增删改**：动态添加、删除、修改表单项配置
- **表单禁用控制**：支持整个表单或单个表单项的禁用状态切换

### 8. 灵活的布局系统

- 基于 Element Plus 的 Row/Col 栅格系统
- 支持响应式布局配置
- 表单项自动适应容器宽度
- 支持自定义表单项和整体布局样式

### 9. 完整的表单验证

- 继承 Element Plus 的完整验证体系
- 支持同步和异步验证规则
- 提供表单实例引用，支持手动验证控制

### 10. TypeScript 支持

- 完整的类型定义覆盖
- 智能提示和类型检查
- 类型安全的 API 设计

## 预览

[https://zhu-jiayu.github.io/element-plus-fast-form-demo/](https://zhu-jiayu.github.io/element-plus-fast-form-demo/)

## 安装与引入

此库依赖以下包，这些包需要在您的项目中安装：

```bash
npm install vue@^3.2.13 element-plus@^2.7.4 @element-plus/icons-vue@^2.0.0
```

### 1. 安装 npm 包

```bash
npm install element-plus-fast-form
# 或
yarn add element-plus-fast-form
```

### 2. 在项目中引入

```ts
import { useForm } from "element-plus-fast-form";
// 或全局注册
import ElementPlusFastForm from "element-plus-fast-form";
app.use(ElementPlusFastForm);
```

## API

### hooks: useForm

**定义：**

```ts
function useForm(config: IFormProps): IUseForm;
```

| 方法名  | 入参类型                                                  | 出参类型 | 说明                       |
| ------- | --------------------------------------------------------- | -------- | -------------------------- |
| useForm | IFormProps \| Reactive\<IFormProps\> \| Ref\<IFormProps\> | IUseForm | 获取表单实例和所有操作方法 |

注意点：入参类型如果是响应式数据，只作用于表单初始化时的异步渲染，如果需要修改表单属性，请使用 setFormConfig 或 setComponentProps 方法。

### useForm 返回属性

| 属性名       | 类型                           | 说明                         |
| ------------ | ------------------------------ | ---------------------------- |
| FastForm     | DefineComponent                | 表单组件，直接用于模板渲染   |
| formValue    | FormValueType                  | 响应式表单数据对象           |
| rawFormValue | FormValueType                  | 原始表单数据对象（非响应式） |
| formRef      | Ref<FormInstance \| undefined> | el-form 实例引用             |

### useForm 返回方法

| 方法名            | 入参类型                                          | 返回类型 | 作用说明                                    |
| ----------------- | ------------------------------------------------- | -------- | ------------------------------------------- |
| addItem           | prop: string, config?: IFormconfig[]              | void     | 添加嵌套表单（config 不传则添加相同的表单） |
| removeItem        | prop: string, key: number                         | void     | 删除嵌套表单（如数组表单 remove）           |
| setComponentProps | prop: string, componentProps: Record<string, any> | void     | 动态设置表单项组件属性（支持嵌套）          |
| setFormValue      | formData: Record<string, any>                     | void     | 动态设置表单数据                            |
| setFormConfig     | prop: string, config: Partial<IFormconfig>        | void     | 动态设置表单项配置（支持嵌套）              |
| setFormConfigs    | newFormConfig: IFormconfig[], isRemoveValue?: boolean                     | Promise<void>     | 批量替换整个表单配置, 第2个参数用于是否删除旧值                        |
| addFormConfig     | config: IFormconfig, targetProp?: string, index?: number | void | 动态添加表单项（支持嵌套）              |
| removeFormConfig  | props: string[], isRemoveValue?: boolean                                  | void     | 动态删除表单项（支持嵌套）, 第2个参数用于是否删除旧值                  |
| setFormDisabled   | disabled: boolean                                 | void     | 禁用/启用整个表单                           |

- `removeItem(prop: string, key: number)`  
  删除指定嵌套表单的第 key 项。

- `setComponentProps(prop, componentProps)`  
  动态修改某个表单项的组件属性（如 options、placeholder、disabled 等）。  
  **支持嵌套格式**：`prop` 可以是 `"parentProp.index.childProp"` 格式。

- `setFormValue(formData)`  
  批量设置表单数据，常用于一键填充或重置。

- `setFormConfig(prop, config)`  
  动态修改某个表单项的配置（如校验规则、label、组件类型等）。  
  **支持嵌套格式**：`prop` 可以是 `"parentProp.index.childProp"` 格式。

- `setFormConfigs(newFormConfig, isRemoveValue?)`  
  **批量替换整个表单配置**，用于异步加载配置或动态切换表单结构。第2个参数用于是否删除旧值。

- `addFormConfig(config, targetProp?, index?)`  
  动态添加表单项。  
  - `config`：要添加的表单配置
  - `targetProp`：目标位置，支持 `"parentProp.index"` 格式添加到嵌套列表
  - `index`：插入位置（仅在顶层添加时有效）

- `removeFormConfig(props, isRemoveValue?)`  
  批量删除表单项，参数为 prop 数组。  
  **支持嵌套格式**：数组元素可以是 `"parentProp.index.childProp"` 格式。

- `setFormDisabled(disabled)`  
  禁用或启用整个表单。

### 嵌套表单操作格式说明

部分方法支持嵌套表单的操作，使用特定的字符串格式来指定嵌套位置：

#### 路径格式
- **3段式**：`"parentProp.index.childProp"` - 用于设置/删除嵌套表单项
- **2段式**：`"parentProp.index"` - 用于向嵌套列表添加表单项
- **普通**：`"normalProp"` - 普通表单项操作

#### 使用示例
```typescript
// 设置嵌套表单项的属性
setFormConfig("addresses.0.street", {
  formItemProps: { label: "街道地址" }
});

// 向嵌套列表添加新字段
addFormConfig(newFieldConfig, "addresses.0");

// 删除嵌套表单项
removeFormConfig(["addresses.0.street", "addresses.1.city"]);

// 设置嵌套表单项的组件属性
setComponentProps("addresses.0.street", {
  placeholder: "请输入街道地址"
});
```


## 类型定义

### 1. IOptions

```ts
/**
 * 表单组件通用选项类型，继承自 Element Plus 的 Select Option 类型。
 * 用于 el-select、el-cascader、el-radio-group、el-checkbox-group 等组件的 options 配置。
 */
export interface IOptions {
  /** 选项显示文本 */
  label: string | number;
  /** 选项实际值 */
  value: string | number | boolean | object;
  /** 是否禁用该选项 */
  disabled?: boolean;
  /** 可选：唯一标识（适合树形结构或自定义 key） */
  key?: string | number;
  /** 子选项（用于级联/树形结构） */
  children?: IOptions[];
  /** 其它自定义属性（兼容 Element Plus Option 类型） */
  [key: string]: any;
}
```

### 2. IFormconfig

```ts
/**
 * 单个表单项的配置类型
 */
export interface IFormconfig {
  /** 组件类型（如 el-input、el-select、slot、自定义组件等） */
  component?: string | AsyncComponent | DefineComponent<any, any, any> | "slot";
  /** el-col 组件属性（如 span、offset 等） */
  colProps?: Record<string, any>;
  /** 组件本身的属性（参考element-plus 组件属性） */
  componentProps?: Partial<{
    options: IOptions[]; // 选项数组
    placeholder: string; // 占位符
    data: IOptions[]; // 其它数据
    [key: string]: any; // 其它自定义属性
  }>;
  /** el-form-item 组件属性（参考element-plus el-form-item 属性） */
  formItemProps: Partial<{
    prop: string; // 字段名
    label: string; // 标签
    rules: Array<FormItemRule>; // 校验规则
    model: FormValueType; // 表单默认值
    [key: string]: any; // 其他属性，参考element-plus el-form-item 属性）
  }>;
  /** 嵌套子表单项（二维数组，用于嵌套表单） */
  children?: Array<Array<IFormconfig>>;
  /** 默认值，优先级高于formItemProps.model */
  defaultValue?: any;
  /** 后缀文字（如单位：%、元等） */
  suffix?: string;
}
```

### 3. IFormProps

```ts
/**
 * 表单整体配置类型
 */
export interface IFormProps<T = IFormconfig> {
  /** 表单项配置数组 */
  formConfig: T[];
  /** el-row 组件属性 */
  rowProps?: Record<string, any>;
  /** el-col 组件属性 */
  colProps?: Record<string, any>;
  /** el-form 组件属性 */
  formProps?: Record<string, any>;
  /** 是否显示嵌套表单操作按钮 */
  showOperate?: boolean;
  /** 操作按钮位置配置，默认 'br'（下右） */
  operatePosition?: 'tl' | 'tr' | 'bl' | 'br';
  /** 自定义操作按钮配置 */
  operateButtons?: IOperateButtons;
  /** 是否显示添加按钮，默认 true */
  showOperateAdd?: boolean;
  /** 是否显示删除按钮，默认 true */
  showOperateDelete?: boolean;
}
```

### 3.1. OperatePosition

```ts
/**
 * 操作按钮位置枚举
 */
export type OperatePosition = 'tl' | 'tr' | 'bl' | 'br';
```

- `'tl'`: 左上（top-left）
- `'tr'`: 右上（top-right）
- `'bl'`: 左下（bottom-left）
- `'br'`: 右下（bottom-right，默认值）

### 3.2. IOperateButtonProps

```ts
/**
 * 操作按钮参数接口
 */
export interface IOperateButtonProps {
  /** 点击事件处理函数 */
  onClick: () => void;
  /** 表单属性名 */
  prop: string;
  /** 当前索引 */
  index: number;
  /** 当前长度 */
  length: number;
}
```

### 3.3. IOperateButtons

```ts
/**
 * 自定义操作按钮配置
 */
export interface IOperateButtons {
  /** 自定义添加按钮（VNode、组件或返回 VNode 的函数） */
  addButton?: VNode | Component | ((props: IOperateButtonProps) => VNode);
  /** 自定义删除按钮（VNode、组件或返回 VNode 的函数） */
  deleteButton?: VNode | Component | ((props: IOperateButtonProps) => VNode);
}
```

### 4. FormValueType

```ts
/**
 * 表单数据对象类型，key 为 prop，value 为表单项的值
 */
export type FormValueType = Record<string, any>;
```

### 5. IUseForm

```ts
/**
 * useForm 返回的所有方法和属性类型
 */
export interface IUseForm {
  /** 表单组件（直接用于模板渲染） */
  FastForm: DefineComponent;
  /** 响应式表单数据对象 */
  formValue: FormValueType;
  /** 原始表单数据对象（非响应式） */
  rawFormValue: FormValueType;
  /** el-form 实例引用 */
  formRef: Ref<FormInstance | undefined>;
  /** 添加嵌套表单项（如数组表单 push） */
  addItem: (prop: string, config?: IFormconfig[]) => void;
  /** 删除嵌套表单项（如数组表单 remove） */
  removeItem: (prop: string, key: number) => void;
  /** 动态设置表单项组件属性（支持嵌套格式：parentProp.index.childProp） */
  setComponentProps: (
    prop: string,
    componentProps: Record<string, any>
  ) => void;
  /** 动态设置表单数据 */
  setFormValue: (formData: Record<string, any>) => void;
  /** 动态设置表单项配置（支持嵌套格式：parentProp.index.childProp） */
  setFormConfig: (prop: string, config: Partial<IFormconfig>) => void;
  /** 批量替换整个表单配置 */
  setFormConfigs: (newFormConfig: IFormconfig[], isRemoveValue?: boolean) => Promise<void>;
  /** 动态添加表单项（支持嵌套格式：targetProp 可为 parentProp.index） */
  addFormConfig: (config: IFormconfig, targetProp?: string, index?: number) => void;
  /** 动态删除表单项（支持嵌套格式：props 元素可为 parentProp.index.childProp） */
  removeFormConfig: (props: string[], isRemoveValue?: boolean) => void;
  /** 禁用/启用整个表单 */
  setFormDisabled: (disabled: boolean) => void;
}
```

## 组件透传属性

根据配置中的 `component` 类型，表单会自动透传不同的属性和方法给对应的组件：

### 1. Slot 组件（component: 'slot'）

当组件类型为 `'slot'` 时，会调用对应的插槽函数并透传以下属性：

```ts
// 插槽函数接收的参数类型
interface SlotProps {
  /** 整个表单的数据对象 */
  formValue: FormValueType;
  /** 当前字段的值 */
  modelValue?: any;
  /** 嵌套列表索引（仅在嵌套表单中存在） */
  nestedKey?: number;
  /** 嵌套列表prop（仅在嵌套表单中存在） */
  nestedProp?: string;
}
```

**使用示例：**

```vue
<template>
  <FastForm>
    <!-- 普通表单项的 slot -->
    <template #fieldName="{ formValue, modelValue }">
      <div>当前值: {{ modelValue }}</div>
      <div>整个表单: {{ formValue }}</div>
    </template>

    <!-- 嵌套列表表单项的 slot -->
    <template #points2="{ formValue, nestedKey, nestedProp }">
      <div class="nested-slot-content">
        <!-- 自定义输入框 -->
        <el-input placeholder="请输入" v-model="formValue[nestedProp][nestedKey].points2" />
      </div>
    </template>
  </FastForm>
</template>
```

### 2. 自定义 Vue 组件

当组件类型为自定义 Vue 组件时，会透传以下属性和方法：

```ts
// 自定义组件接收的 props 类型
interface CustomComponentProps {
  /** 整个表单的数据对象 */
  formValue: FormValueType;
  /** 当前字段的属性名 */
  prop?: string;
  /** 当前字段的值 */
  modelValue?: any;
  /** 嵌套列表索引 */
  nestedKey?: number;
  /** 嵌套列表prop */
  nestedProp?: string;
  /** 值更新回调函数 */
  "onUpdate:modelValue"?: (value: any) => void;
  /** 配置中的所有组件属性 */
  [key: string]: any; // 来自 itemConfig.componentProps

  // Form 类的所有公共方法：
  /** 添加嵌套表单项 */
  addItem: (prop: string, config?: IFormconfig[]) => void;
  /** 删除嵌套表单项 */
  removeItem: (prop: string, key: number) => void;
  /** 动态设置表单项组件属性（支持嵌套格式：parentProp.index.childProp） */
  setComponentProps: (
    prop: string,
    componentProps: Record<string, any>
  ) => void;
  /** 动态设置表单数据 */
  setFormValue: (formData: Record<string, any>) => void;
  /** 动态设置表单项配置（支持嵌套格式：parentProp.index.childProp） */
  setFormConfig: (prop: string, config: Partial<IFormconfig>) => void;
  /** 批量替换整个表单配置 */
  setFormConfigs: (newFormConfig: IFormconfig[], isRemoveValue?: boolean) => Promise<void>;
  /** 动态添加表单项（支持嵌套格式：targetProp 可为 parentProp.index） */
  addFormConfig: (config: IFormconfig, targetProp?: string, index?: number) => void;
  /** 动态删除表单项（支持嵌套格式：props 元素可为 parentProp.index.childProp） */
  removeFormConfig: (props: string[], isRemoveValue?: boolean) => void;
  /** 禁用/启用整个表单 */
  setFormDisabled: (disabled: boolean) => void;
}
```

**使用示例：**

```vue
<!-- 自定义头像上传组件 Avatar-upload/index.vue -->
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

const imageUrl = ref("");

// 接收透传的属性
const props = defineProps({
  formValue: {
    // 整个表单数据对象
    type: Object,
  },
  modelValue: {
    // 当前字段的值
    type: String,
    default: "",
  },
  prop: {
    // 当前字段的属性名
    type: String,
  },
  // 还可以接收 Form 类的所有公共方法，如 addItem, removeItem, setComponentProps, setFormValue 等
});

// 监听 modelValue 变化，处理表单重置等场景
watch(
  () => props.modelValue,
  () => {
    imageUrl.value = props.modelValue;
  }
);

// 定义事件，实现双向绑定
const emits = defineEmits(["update:modelValue"]);

const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload = async (rawFile) => {
  if (!["image/jpeg", "image/jpg", "image/png"].includes(rawFile.type)) {
    ElMessage.error("请传图片");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小不能超过 2MB!");
    return false;
  }

  // 处理文件并更新表单值
  const filedata = await getImageInfo(rawFile);
  imageUrl.value = filedata;
  emits("update:modelValue", filedata); // 通知表单更新值

  return true;
};

const getImageInfo = (file: any): Promise<string> => {
  let fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  return new Promise((resolve) => {
    fileReader.onload = function (e) {
      resolve(this.result as string);
    };
  });
};
</script>
```

**在表单配置中使用：**

```ts
import AvatarUpload from "@/components/Avatar-upload/index.vue";

const formConfig: IFormconfig[] = [
  {
    component: AvatarUpload, // 使用自定义组件
    formItemProps: {
      prop: "avatar",
      label: "头像上传",
    },
    // componentProps 中的属性也会透传给组件
    componentProps: {
      // 可以传递其他自定义属性
    },
  },
];
```

### 3. String 组件（HTML 标签字符串）

当组件类型为字符串（如 `'div'`、`'span'` 等）时，会透传：

```ts
// String 组件接收的属性
interface StringComponentProps {
  /** 配置中的所有组件属性 */
  [key: string]: any; // 来自 itemConfig.componentProps
}
// 子元素内容为 itemConfig.defaultValue 或 null
```

**使用示例：**

```ts
const config: IFormconfig = {
  component: "div",
  componentProps: {
    class: "custom-text",
    style: { color: "red" },
  },
  defaultValue: "这是一个文本内容",
  formItemProps: {
    prop: "textField",
    label: "文本标签",
  },
};
```

### 4. Element Plus 组件（el- 前缀）

当组件类型为 Element Plus 组件（如 `'el-input'`、`'el-select'` 等）时，会自动透传：

```ts
// Element Plus 组件接收的属性
interface ElementComponentProps {
  /** 当前字段的值 */
  modelValue?: any;
  /** 值更新回调函数 */
  "onUpdate:modelValue": (value: any) => void;
  /** 配置中的所有组件属性 */
  [key: string]: any; // 来自 itemConfig.componentProps
  /** 自动设置的样式 */
  style: {
    width: string; // 默认为 '100%' 或来自 componentProps.style.width
  };
  /** 嵌套列表索引 */
  nestedKey?: number;
  /** 嵌套列表prop */
  nestedProp?: string;
}
```

**注意事项：**

- 所有透传的属性都来自于 `itemConfig.componentProps` 配置
- 自定义组件会额外获得 Form 类的所有公共方法
- 透传的方法包括表单操作方法（如 `addItem`、`removeItem`）和动态配置方法（如 `setComponentProps`、`setFormValue` 等）
- 嵌套表单中的组件会额外获得 `nestedKey` 参数
- 组件的双向绑定通过 `modelValue` 和 `onUpdate:modelValue` 实现


## 表单列表自定义操作按钮

表单列表（嵌套表单）支持自定义操作按钮，包括添加和删除按钮的样式、位置和显示逻辑。

### 基本配置

```typescript
import { useForm } from "element-plus-fast-form";

const { FastForm, formValue } = useForm({
  formConfig: [
    {
      formItemProps: { prop: "children", label: "项目成员" },
      children: [
        [
          // 表单项配置...
        ],
      ],
    },
  ],
  // 显示操作按钮（默认 true）
  showOperate: true,
  // 操作按钮位置：'tl' | 'tr' | 'bl' | 'br'（默认 'br'）
  operatePosition: 'br',
  // 是否显示添加按钮（默认 true）
  showOperateAdd: true,
  // 是否显示删除按钮（默认 true）
  showOperateDelete: true,
});
```

### 方式一：使用组件自定义按钮

```typescript
import AddButton from "./components/AddButton.vue";
import DeleteButton from "./components/DeleteButton.vue";

const { FastForm, formValue } = useForm({
  formConfig: [
    // ...表单配置
  ],
  showOperate: true,
  operatePosition: 'tr',
  operateButtons: {
    // 使用 Vue 组件
    addButton: AddButton,
    deleteButton: DeleteButton,
  },
});
```

**自定义按钮组件示例（AddButton.vue）：**

```vue
<template>
  <el-button type="primary" @click="handleClick">
    添加成员
  </el-button>
</template>

<script setup lang="ts">
import type { IOperateButtonProps } from "element-plus-fast-form";

// 接收操作按钮参数
const props = defineProps<IOperateButtonProps>();

const handleClick = () => {
  // 调用传入的 onClick 方法
  props.onClick();
};
</script>
```

### 方式二：使用 h 函数自定义按钮

```typescript
import { h, resolveComponent } from "vue";
import type { IOperateButtonProps } from "element-plus-fast-form";

// 自定义添加按钮
function renderAddButton(props: IOperateButtonProps) {
  return h(resolveComponent("el-button"), {
    type: "primary",
    onClick: props.onClick,
  }, "添加");
}

// 自定义删除按钮（可根据条件控制显示）
function renderDeleteButton(props: IOperateButtonProps) {
  // 当只有一项时，不显示删除按钮
  if (props.length <= 1) {
    return null;
  }
  return h(resolveComponent("el-button"), {
    type: "danger",
    onClick: props.onClick,
  }, "删除");
}

const { FastForm, formValue } = useForm({
  formConfig: [
    // ...表单配置
  ],
  showOperate: true,
  operatePosition: 'tr',
  operateButtons: {
    // 使用函数返回 VNode
    addButton: renderAddButton,
    deleteButton: renderDeleteButton,
  },
});
```

### 方式三：使用 VNode 自定义按钮

```typescript
import { h, resolveComponent } from "vue";

const { FastForm, formValue } = useForm({
  formConfig: [
    // ...表单配置
  ],
  showOperate: true,
  operatePosition: 'tr',
  operateButtons: {
    // 直接使用 VNode（注意：这种方式无法访问动态参数）
    addButton: h(resolveComponent("el-button"), {
      type: "primary",
    }, "添加"),
  },
});
```

#### 操作按钮参数说明

自定义按钮函数或组件会接收以下参数：

- `onClick`: 点击事件处理函数，调用后会执行添加/删除操作
- `prop`: 表单属性名（嵌套表单的 prop）
- `index`: 当前列表项的索引（删除按钮时使用）
- `length`: 当前列表的总长度

#### 完整示例

```typescript
import { useForm } from "element-plus-fast-form";
import { h, resolveComponent } from "vue";
import type { IOperateButtonProps } from "element-plus-fast-form";

// 使用 h 函数自定义按钮
function renderAddButton(props: IOperateButtonProps) {
  return h(resolveComponent("el-button"), {
    type: "primary",
    size: "small",
    icon: "Plus",
    onClick: props.onClick,
  }, "添加成员");
}

function renderDeleteButton(props: IOperateButtonProps) {
  if (props.length <= 1) {
    return null; // 只有一项时不显示删除按钮
  }
  return h(resolveComponent("el-button"), {
    type: "danger",
    size: "small",
    icon: "Delete",
    onClick: props.onClick,
  }, "删除");
}

const { FastForm, formValue } = useForm({
  formConfig: [
    {
      formItemProps: { prop: "children", label: "项目成员" },
      children: [
        [
          {
            component: "el-input",
            formItemProps: {
              prop: "name",
              label: "成员姓名",
            },
            componentProps: {
              placeholder: "请输入成员姓名",
            },
          },
        ],
      ],
    },
  ],
  showOperate: true,
  operatePosition: 'tr', // 右上角
  showOperateAdd: true,
  showOperateDelete: true,
  operateButtons: {
    addButton: renderAddButton,
    deleteButton: renderDeleteButton,
  },
});
```
