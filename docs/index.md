# element-plus-fast-form 使用说明

本项目基于 Element Plus，采用“配置驱动+类封装+组合式 API”模式，适合中后台、低代码、动态表单等复杂场景。


## 目录

- [安装与引入](#安装与引入)
- [类型定义（types）](#类型定义)
- [核心 Hooks](#核心-hooks)
- [预览](#预览)


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
  component?: string | AsyncComponent | DefineComponent<any, any, any> | 'slot';
  /** el-col 组件属性（如 span、offset 等） */
  colProps?: Record<string, any>;
  /** 组件本身的属性（参考element-plus 组件属性） */
  componentProps?: Partial<{
    options: IOptions[];      // 选项数组
    placeholder: string;      // 占位符
    data: IOptions[];         // 其它数据
    [key: string]: any;       // 其它自定义属性
  }>;
  /** el-form-item 组件属性（参考element-plus el-form-item 属性） */
  formItemProps: Partial<{
    prop: string;             // 字段名（必填，唯一）
    label: string;            // 标签
    rules?: Array<FormItemRule>; // 校验规则
    [key: string]: any;
  }>;
  /** 嵌套子表单项（二维数组，用于嵌套表单） */
  children?: Array<Array<IFormconfig>>;
  /** 默认值 */
  defaultValue?: any;
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
}
```

### 4. FormValueType

```ts
/**
 * 表单数据对象类型，key 为 prop，value 为表单项的值
 */
export type FormValueType = Record<string, any>;
```

### 5. INestedDataProps

```ts
/**
 * 嵌套表单项的数据结构（如数组表单的每一项）
 */
export interface INestedDataProps {
  /** 父级 prop 名称 */
  prop: string;
  /** 当前项的唯一 key（如索引） */
  key: number;
}
```

### 6. IUseForm

```ts
/**
 * useForm 返回的所有方法和属性类型
 */
export interface IUseForm {
  /** 表单组件（直接用于模板渲染） */
  FastForm: DefineComponent;
  /** 响应式表单数据对象 */
  formValue: FormValueType;
  /** 原始表单数据对象（非响应式，适合 watch） */
  rawFormValue: FormValueType;
  /** el-form 实例引用 */
  formRef: Ref<FormInstance | undefined>;
  /** 添加嵌套表单项（如数组表单 push） */
  addItem: (prop: string) => void;
  /** 删除嵌套表单项（如数组表单 remove） */
  removeItem: (prop: string, key: number) => void;
  /** 动态设置表单项组件属性 */
  setComponentProps: (prop: string, componentProps: Record<string, any>) => void;
  /** 动态设置表单数据 */
  setFormValue: (formData: Record<string, any>) => void;
  /** 动态设置表单项配置 */
  setFormConfig: (prop: string, config: Partial<IFormconfig>) => void;
  /** 动态添加表单项 */
  addFormConfig: (config: IFormconfig, index?: number) => void;
  /** 动态删除表单项 */
  removeFormConfig: (props: string[]) => void;
  /** 禁用/启用整个表单 */
  setFormDisabled: (disabled: boolean) => void;
}
```


## 核心 Hooks

### useForm

**定义：**

```ts
function useForm(config: IFormProps): IUseForm
```


| 方法名                | 入参类型                                   | 出参类型         | 说明                       |
|-----------------------|--------------------------------------------|------------------|----------------------------|
| useForm               | IFormProps                                 | IUseForm         | 获取表单实例和所有操作方法 |



### useForm 返回属性

| 属性名         | 类型                    | 说明                                 |
|----------------|------------------------|--------------------------------------|
| FastForm       | DefineComponent        | 表单组件，直接用于模板渲染           |
| formValue      | FormValueType          | 响应式表单数据对象                   |
| rawFormValue   | FormValueType          | 原始表单数据对象（非响应式，适合 watch）|
| formRef        | Ref<FormInstance \| undefined> | el-form 实例引用             |


### useForm 返回方法

| 方法名             | 入参类型                                         | 返回类型 | 作用说明                                 |
|--------------------|--------------------------------------------------|----------|------------------------------------------|
| addItem            | prop: string                                     | void     | 添加嵌套表单项（如数组表单 push）        |
| removeItem         | prop: string, key: number                        | void     | 删除嵌套表单项（如数组表单 remove）      |
| setComponentProps  | prop: string, componentProps: Record<string, any> | void     | 动态设置表单项组件属性                   |
| setFormValue       | formData: Record<string, any>                    | void     | 动态设置表单数据                         |
| setFormConfig      | prop: string, config: Partial<IFormconfig>       | void     | 动态设置表单项配置                       |
| addFormConfig      | config: IFormconfig, index?: number              | void     | 动态添加表单项                           |
| removeFormConfig   | props: string[]                                  | void     | 动态删除表单项                           |
| setFormDisabled    | disabled: boolean                                | void     | 禁用/启用整个表单                        |


**方法说明举例：**

- `addItem(prop: string)`  
  向指定嵌套表单（如数组表单）添加一项。

- `removeItem(prop: string, key: number)`  
  删除指定嵌套表单的第 key 项。

- `setComponentProps(prop, componentProps)`  
  动态修改某个表单项的组件属性（如 options、placeholder、disabled 等）。

- `setFormValue(formData)`  
  批量设置表单数据，常用于一键填充或重置。

- `setFormConfig(prop, config)`  
  动态修改某个表单项的配置（如校验规则、label、组件类型等）。

- `addFormConfig(config, index?)`  
  动态添加表单项，可指定插入位置。

- `removeFormConfig(props)`  
  批量删除表单项，参数为 prop 数组。

- `setFormDisabled(disabled)`  
  禁用或启用整个表单。


## 方法示例
[https://zhu-jiayu.github.io/element-plus-fast-form-demo/](https://zhu-jiayu.github.io/element-plus-fast-form-demo/)
