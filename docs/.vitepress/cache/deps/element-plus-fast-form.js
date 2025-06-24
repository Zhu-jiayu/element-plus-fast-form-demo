import {
  delete_default,
  plus_default
} from "./chunk-OPMHOXNV.js";
import {
  Fragment,
  createVNode,
  defineComponent,
  h,
  isReactive,
  isRef,
  isVNode,
  markRaw,
  mergeProps,
  reactive,
  ref,
  resolveComponent,
  toRaw
} from "./chunk-2PGDDOS4.js";
import {
  __publicField
} from "./chunk-EQCVQC35.js";

// node_modules/.pnpm/element-plus-fast-form@1.2.0_@element-plus+icons-vue@2.0.0_vue@3.5.16__element-plus@2.7.4_vue@3.5.16__vue@3.5.16/node_modules/element-plus-fast-form/dist/index.es.js
var EOptions = ((EOptions2) => {
  EOptions2["el-select"] = "el-option";
  EOptions2["el-radio-group"] = "el-radio";
  EOptions2["el-checkbox-group"] = "el-checkbox";
  EOptions2["el-cascader"] = "span";
  EOptions2["el-tree-select"] = "span";
  return EOptions2;
})(EOptions || {});
var InitialValueMap = {
  "el-checkbox-group": []
};
var getType = (val) => Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
function cloneDeepWith(value, customizer, map = /* @__PURE__ */ new WeakMap()) {
  if (value === null || typeof value !== "object") {
    return value;
  }
  if (map.has(value)) {
    return map.get(value);
  }
  if (customizer) {
    const result = customizer(value, null, void 0, map);
    if (result !== void 0) {
      return result;
    }
  }
  const type = getType(value);
  switch (type) {
    case "date": {
      if (value instanceof Date) {
        return new Date(value.getTime());
      }
      return value;
    }
    case "regexp": {
      if (value instanceof RegExp) {
        const flags = value.flags;
        const result = new RegExp(value.source, flags);
        result.lastIndex = value.lastIndex;
        return result;
      }
      return value;
    }
    case "map": {
      if (value instanceof Map) {
        const mapResult = /* @__PURE__ */ new Map();
        map.set(value, mapResult);
        value.forEach((val, key) => {
          const keyResult = typeof key === "object" && key !== null ? cloneDeepWith(key, customizer, map) : key;
          const valueResult = cloneDeepWith(val, customizer, map);
          mapResult.set(keyResult, valueResult);
        });
        return mapResult;
      }
      return value;
    }
    case "set": {
      if (value instanceof Set) {
        const setResult = /* @__PURE__ */ new Set();
        map.set(value, setResult);
        value.forEach((val) => {
          const itemResult = cloneDeepWith(val, customizer, map);
          setResult.add(itemResult);
        });
        return setResult;
      }
      return value;
    }
    case "array": {
      if (Array.isArray(value)) {
        const arrResult = [];
        map.set(value, arrResult);
        value.forEach((item, index) => {
          const customResult = customizer ? customizer(item, index, value, map) : void 0;
          arrResult[index] = customResult !== void 0 ? customResult : cloneDeepWith(item, customizer, map);
        });
        return arrResult;
      }
      return value;
    }
    case "object": {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        return value;
      }
      const proto = Object.getPrototypeOf(value);
      const ctor = proto == null ? void 0 : proto.constructor;
      if (ctor && ctor !== Object) {
        try {
          const objResult2 = new ctor();
          map.set(value, objResult2);
          Object.entries(value).forEach(([key, val]) => {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
              const customResult = customizer ? customizer(val, key, value, map) : void 0;
              objResult2[key] = customResult !== void 0 ? customResult : cloneDeepWith(val, customizer, map);
            }
          });
          return objResult2;
        } catch (e) {
          console.warn("Failed to clone with constructor, falling back to plain object clone", e);
        }
      }
      const objResult = Object.create(proto);
      map.set(value, objResult);
      const allKeys = [
        ...Object.keys(value),
        ...Object.getOwnPropertySymbols(value)
      ];
      allKeys.forEach((key) => {
        if (Object.prototype.propertyIsEnumerable.call(value, key)) {
          const val = value[key];
          const customResult = customizer ? customizer(val, key, value, map) : void 0;
          objResult[key] = customResult !== void 0 ? customResult : cloneDeepWith(val, customizer, map);
        }
      });
      return objResult;
    }
    default:
      return value;
  }
}
var groupRow = "_groupRow_1d203_8";
var border = "_border_1d203_13";
var operate = "_operate_1d203_21";
var styles = {
  groupRow,
  border,
  operate
};
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function deepCloneWithMarkRaw(obj) {
  return cloneDeepWith(obj, (value, key) => {
    if (key === "component" && (typeof value === "object" || typeof value === "function")) {
      return markRaw(value);
    }
    return void 0;
  });
}
var FormCore = class {
  constructor(config) {
    __publicField(this, "formValue", {});
    __publicField(this, "formRef", ref());
    __publicField(this, "formConfig", []);
    __publicField(this, "rowProps", {});
    __publicField(this, "colProps", {});
    __publicField(this, "formProps", {});
    __publicField(this, "disabled", ref(false));
    var _a;
    const processedConfig = this._handleConfig(config.formConfig);
    this.formConfig = reactive(processedConfig);
    this.rowProps = this._handleConfig(config.rowProps || {});
    this.colProps = this._handleConfig(config.colProps || {});
    this.formProps = this._handleConfig(config.formProps || {});
    const model = this._handleConfig(((_a = this.formProps) == null ? void 0 : _a.model) || {});
    const vals = this._initValue(model, processedConfig);
    Object.assign(this.formValue, vals);
    this.formValue = reactive(this.formValue);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  _generateComponent(itemConfig, slots, nestedKey) {
    var _a;
    if (itemConfig.component === "slot") {
      return this._generateSlot(itemConfig, slots, nestedKey);
    } else if (this._isVueComponent(itemConfig.component)) {
      return this._generateCustomComponent(itemConfig, nestedKey);
    } else if (typeof (itemConfig == null ? void 0 : itemConfig.component) === "string" && ((_a = itemConfig == null ? void 0 : itemConfig.component) == null ? void 0 : _a.startsWith("el-"))) {
      return this._generateElementComponent(itemConfig, nestedKey);
    }
    return null;
  }
  _generateNestedData(nestedKey, prop, value) {
    const lastData = {
      [prop]: value
    };
    if (!this.formValue[nestedKey.prop]) {
      this.formValue[nestedKey.prop] = [];
      this.formValue[nestedKey.prop][nestedKey.key] = lastData;
    } else {
      this.formValue[nestedKey.prop][nestedKey.key] = {
        ...this.formValue[nestedKey.prop][nestedKey.key],
        ...lastData
      };
    }
  }
  /**
   * 处理配置对象
   * @param config 配置对象
   * @returns 处理后的普通对象
   */
  _handleConfig(config) {
    const rawConfig = isReactive(config) || isRef(config) ? toRaw(config) : config;
    return deepCloneWithMarkRaw(rawConfig);
  }
  _isVueComponent(arg) {
    return Object.prototype.hasOwnProperty.call(arg, "render") || Object.prototype.hasOwnProperty.call(arg, "setup");
  }
  _generateElementComponent(itemConfig, nestedKey) {
    var _a, _b, _c, _d, _e;
    return h(resolveComponent(itemConfig.component), {
      ...itemConfig.componentProps,
      modelValue: nestedKey ? (_c = (_b = (_a = this.formValue) == null ? void 0 : _a[nestedKey.prop]) == null ? void 0 : _b[nestedKey.key]) == null ? void 0 : _c[itemConfig.formItemProps.prop] : this.formValue[itemConfig.formItemProps.prop],
      "onUpdate:modelValue": (value) => {
        if (nestedKey) {
          this._generateNestedData(nestedKey, itemConfig.formItemProps.prop, value);
        } else {
          this.formValue[itemConfig.formItemProps.prop] = value;
        }
      }
    }, ((_e = (_d = itemConfig == null ? void 0 : itemConfig.componentProps) == null ? void 0 : _d.options) == null ? void 0 : _e.length) ? {
      default: ({
        data
      }) => {
        var _a2;
        return EOptions[itemConfig.component] == "span" ? data.label : h(Fragment, {}, [...(((_a2 = itemConfig == null ? void 0 : itemConfig.componentProps) == null ? void 0 : _a2.options) || []).map((i) => {
          return h(resolveComponent(EOptions[itemConfig.component]), {
            key: i.key || i.value,
            ...i
          });
        })]);
      }
    } : {});
  }
  /**
   * 获取子类方法
   * @returns 子类方法对象
   */
  _getSubClassMethods() {
    const proto = Object.getPrototypeOf(this);
    const methods = {};
    Object.getOwnPropertyNames(proto).forEach((key) => {
      if (typeof this[key] === "function" && key !== "constructor") {
        methods[key] = this[key].bind(this);
      }
    });
    return methods;
  }
  _generateCustomComponent(itemConfig, nestedKey) {
    var _a, _b, _c;
    const methods = this._getSubClassMethods();
    return h(itemConfig.component, {
      prop: itemConfig.formItemProps.prop,
      formValue: this.formValue,
      modelValue: nestedKey ? (_c = (_b = (_a = this.formValue) == null ? void 0 : _a[nestedKey.prop]) == null ? void 0 : _b[nestedKey.key]) == null ? void 0 : _c[itemConfig.formItemProps.prop] : this.formValue[itemConfig.formItemProps.prop],
      "onUpdate:modelValue": (value) => {
        if (nestedKey) {
          this._generateNestedData(nestedKey, itemConfig.formItemProps.prop, value);
        } else {
          this.formValue[itemConfig.formItemProps.prop] = value;
        }
      },
      ...methods
    });
  }
  _generateSlot(itemConfig, slots, nestedKey) {
    var _a, _b, _c, _d;
    return (_d = slots == null ? void 0 : slots[itemConfig.formItemProps.prop]) == null ? void 0 : _d.call(slots, {
      formValue: this.formValue,
      nestedKey,
      modelValue: nestedKey ? (_c = (_b = (_a = this.formValue) == null ? void 0 : _a[nestedKey.prop]) == null ? void 0 : _b[nestedKey.key]) == null ? void 0 : _c[itemConfig.formItemProps.prop] : this.formValue[itemConfig.formItemProps.prop]
      // ...methods,
    });
  }
  _initValue(formValue, config, parentProp, key) {
    const values = {};
    config == null ? void 0 : config.forEach((item) => {
      var _a, _b;
      if (item.children) {
        const listValue = [];
        item.children.forEach((i, k) => {
          listValue.push(this._initValue(formValue, i, item.formItemProps.prop, k));
        });
        values[item.formItemProps.prop] = listValue;
      } else {
        const initialValue = InitialValueMap[item.formItemProps.prop] || null;
        const preValue = parentProp ? ((_b = (_a = formValue == null ? void 0 : formValue[parentProp]) == null ? void 0 : _a[key]) == null ? void 0 : _b[item.formItemProps.prop]) || "" : formValue[item.formItemProps.prop];
        const defaultValue = item.defaultValue;
        values[item.formItemProps.prop] = preValue !== void 0 ? preValue : defaultValue || initialValue;
      }
    });
    return values;
  }
  addItem(prop) {
    var _a, _b;
    const index = this.formConfig.findIndex((i) => i.formItemProps.prop === prop);
    if (index > -1) {
      this.formConfig[index].children.push((_b = (_a = this.formConfig[index]) == null ? void 0 : _a.children) == null ? void 0 : _b[0]);
      const processedConfig = this._handleConfig(this.formConfig);
      const vals = this._initValue(this.formValue, processedConfig);
      Object.assign(this.formValue, vals);
    }
  }
  removeItem(prop, key) {
    const index = this.formConfig.findIndex((i) => i.formItemProps.prop === prop);
    if (index > -1 && key > 0) {
      this.formValue[prop].splice(key, 1);
      this.formConfig[index].children.splice(key, 1);
      const processedConfig = this._handleConfig(this.formConfig);
      const vals = this._initValue(this.formValue, processedConfig);
      Object.assign(this.formValue, vals);
    }
  }
  getform() {
    return defineComponent({
      setup: (_props, {
        slots
      }) => {
        return () => {
          let _slot3;
          const finalFormProps = {
            ref: this.formRef,
            model: this.formValue,
            disabled: this.disabled.value,
            ...this.formProps
          };
          return createVNode(resolveComponent("el-form"), finalFormProps, {
            default: () => {
              var _a;
              return [createVNode(resolveComponent("el-row"), mergeProps(this.rowProps || {}, {
                "gutter": ((_a = this.rowProps) == null ? void 0 : _a.gutter) || 24
              }), _isSlot(_slot3 = (this.formConfig || []).map((item) => {
                var _a2, _b;
                let _slot2;
                return Array.isArray(item.children) ? createVNode("div", {
                  "class": `${styles.groupRow}`
                }, [(item.children || []).map((citem, ckey) => {
                  var _a3;
                  return createVNode(resolveComponent("el-row"), mergeProps(this.rowProps || {}, {
                    "gutter": ((_a3 = this.rowProps) == null ? void 0 : _a3.gutter) || 24,
                    "class": styles.border
                  }), {
                    default: () => [citem == null ? void 0 : citem.map((c) => {
                      var _a4, _b2;
                      let _slot;
                      return createVNode(resolveComponent("el-col"), mergeProps({
                        "key": `${item.formItemProps.prop}.${ckey}.${c.formItemProps.prop}`
                      }, (c == null ? void 0 : c.colProps) || this.colProps || {}, {
                        "span": ((_a4 = c == null ? void 0 : c.colProps) == null ? void 0 : _a4.span) || ((_b2 = this.colProps) == null ? void 0 : _b2.span) || 24
                      }), {
                        default: () => [createVNode(resolveComponent("el-form-item"), mergeProps(c.formItemProps, {
                          "class": styles["form-item"],
                          "prop": `${item.formItemProps.prop}.${ckey}.${c.formItemProps.prop}`
                        }), _isSlot(_slot = this._generateComponent(c, slots, {
                          prop: item.formItemProps.prop,
                          key: ckey
                        })) ? _slot : {
                          default: () => [_slot]
                        })]
                      });
                    }), createVNode("div", {
                      "class": styles.operate
                    }, [createVNode(resolveComponent("el-button"), {
                      "icon": plus_default,
                      "circle": true,
                      "size": "small",
                      "onClick": () => {
                        this.addItem(item.formItemProps.prop);
                      }
                    }, null), ckey > 0 ? createVNode(resolveComponent("el-popconfirm"), {
                      "title": "确定删除吗？",
                      "onConfirm": () => {
                        this.removeItem(item.formItemProps.prop, ckey);
                      },
                      "confirm-button-text": "确定",
                      "cancel-button-text": "取消"
                    }, {
                      reference: createVNode(resolveComponent("el-button"), {
                        "icon": delete_default,
                        "circle": true,
                        "size": "small"
                      }, null)
                    }) : null])]
                  });
                })]) : createVNode(resolveComponent("el-col"), mergeProps((item == null ? void 0 : item.colProps) || this.colProps || {}, {
                  "span": ((_a2 = item == null ? void 0 : item.colProps) == null ? void 0 : _a2.span) || ((_b = this.colProps) == null ? void 0 : _b.span) || 8,
                  "key": item.formItemProps.prop
                }), {
                  default: () => [createVNode(resolveComponent("el-form-item"), mergeProps(item.formItemProps, {
                    "class": styles["form-item"]
                  }), _isSlot(_slot2 = this._generateComponent(item, slots)) ? _slot2 : {
                    default: () => [_slot2]
                  })]
                });
              })) ? _slot3 : {
                default: () => [_slot3]
              })];
            }
          });
        };
      }
    });
  }
};
var Form = class extends FormCore {
  constructor(config) {
    super(config);
    this.setComponentProps = this.setComponentProps.bind(this);
    this.setFormValue = this.setFormValue.bind(this);
    this.setFormConfig = this.setFormConfig.bind(this);
    this.addFormConfig = this.addFormConfig.bind(this);
    this.removeFormConfig = this.removeFormConfig.bind(this);
    this.setFormDisabled = this.setFormDisabled.bind(this);
  }
  /**
   * 动态更新表单项的组件属性
   * @param prop 表单项的 prop 值
   * @param componentProps 需要更新的组件属性对象
   */
  setComponentProps(prop, componentProps) {
    const targetItem = this.formConfig.find((item) => item.formItemProps.prop === prop);
    if (targetItem) {
      if (!targetItem.componentProps) {
        targetItem.componentProps = {};
      }
      Object.assign(targetItem.componentProps, componentProps);
    }
  }
  /**
   * 动态更新表单值
   * @param key 表单项的 key
   * @param value 要更新的值
   */
  setFormValue(formData) {
    Object.assign(this.formValue, formData);
  }
  /**
   * 更新指定表单项的配置
   * @param prop 表单项的 prop 值
   * @param config 新的配置项
   */
  setFormConfig(prop, config) {
    const targetIndex = this.formConfig.findIndex((item) => item.formItemProps.prop === prop);
    if (targetIndex > -1) {
      const newConfig = {
        ...this.formConfig[targetIndex],
        formItemProps: {
          ...this.formConfig[targetIndex].formItemProps,
          ...config.formItemProps || {},
          prop
          // Ensure prop is preserved
        },
        componentProps: {
          ...this.formConfig[targetIndex].componentProps,
          ...config.componentProps || {}
        }
      };
      this.formConfig[targetIndex] = newConfig;
      if (config.hasOwnProperty("defaultValue")) {
        this.formValue[prop] = config.defaultValue;
      }
    }
  }
  /**
   * 在指定位置添加表单配置项
   * @param config 要添加的表单配置
   * @param index 插入的位置索引，如果不传则追加到末尾
   */
  addFormConfig(config, index) {
    const exists = this.formConfig.some((item) => item.formItemProps.prop === config.formItemProps.prop);
    if (!exists) {
      const processedConfig = this._handleConfig([config])[0];
      if (typeof index === "number" && index >= 0 && index <= this.formConfig.length) {
        this.formConfig.splice(index, 0, processedConfig);
      } else {
        this.formConfig.push(processedConfig);
      }
      const vals = this._initValue(this.formValue, [processedConfig]);
      Object.assign(this.formValue, vals);
    }
  }
  /**
   * 删除表单配置项
   * @param prop 要删除的表单项的 prop 值
   */
  removeFormConfig(props) {
    const indexesToRemove = props.reduce((acc, prop) => {
      const index = this.formConfig.findIndex((item) => item.formItemProps.prop === prop);
      if (index > -1) {
        acc.push(index);
      }
      return acc;
    }, []);
    if (indexesToRemove.length > 0) {
      indexesToRemove.sort((a, b) => b - a);
      indexesToRemove.forEach((index) => {
        const prop = this.formConfig[index].formItemProps.prop;
        this.formConfig.splice(index, 1);
        delete this.formValue[prop];
      });
    }
  }
  setFormDisabled(disabled) {
    this.disabled.value = disabled;
  }
};
function useForm(config) {
  const form = new Form(config);
  const FastForm = form.getform();
  const {
    formRef,
    formValue,
    addItem,
    removeItem,
    setComponentProps,
    setFormValue,
    setFormConfig,
    addFormConfig,
    removeFormConfig,
    setFormDisabled
  } = form;
  return {
    FastForm,
    formValue,
    rawFormValue: toRaw(formValue),
    formRef,
    addItem,
    removeItem,
    setComponentProps,
    setFormValue,
    setFormConfig,
    addFormConfig,
    removeFormConfig,
    setFormDisabled
  };
}
var hooks = {
  useForm
};
var ElementPlusFastForm = {
  install: (app) => {
    app.config.globalProperties.$useForm = useForm;
  },
  ...hooks
};
var isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
if (isBrowser) {
  const debounce = (fn, delay) => {
    let timer = null;
    return function(...args) {
      const _t = this;
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(_t, args);
      }, delay);
    };
  };
  if (window.ResizeObserver) {
    const _ResizeObserver = window.ResizeObserver;
    window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
      constructor(callback) {
        callback = debounce(callback, 16);
        super(callback);
      }
    };
  }
}
if (typeof window !== "undefined" && typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = "._form-item_1d203_1 :deep(._el-form-item__content_1d203_1 > *){width:100%}._form-item_1d203_1 .el-form-item__content>*{width:100%}._groupRow_1d203_8{width:100%;padding:0 24px 24px}._border_1d203_13{border:1px solid #dcdfe6;padding:12px 0;margin-bottom:12px;border-radius:8px;position:relative}._operate_1d203_21{position:absolute;right:8px;bottom:8px}\n";
  document.head.appendChild(style);
}
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = "._form-item_1d203_1 :deep(._el-form-item__content_1d203_1 > *){width:100%}._form-item_1d203_1 .el-form-item__content>*{width:100%}._groupRow_1d203_8{width:100%;padding:0 24px 24px}._border_1d203_13{border:1px solid #dcdfe6;padding:12px 0;margin-bottom:12px;border-radius:8px;position:relative}._operate_1d203_21{position:absolute;right:8px;bottom:8px}\n";
  document.head.appendChild(style);
}
export {
  ElementPlusFastForm as default,
  useForm
};
//# sourceMappingURL=element-plus-fast-form.js.map
