import { defineComponent, ref, onUpdated, resolveComponent, mergeProps, withCtx, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    formValue: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      // 当前组件数据
      type: String,
      default: ""
    },
    prop: {
      type: String
    },
    // 用于设置表单项的值
    setFormValue: {
      type: Function,
      default: () => void 0
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const options = ref([
      { label: "男", value: "male" },
      { label: "女2", value: "female" }
    ]);
    const props = __props;
    const emits = __emit;
    function handleSelectChange(value) {
      emits("update:modelValue", value);
      console.log(props, "++");
      if (value === "male") {
        props.setFormValue({
          radio: "B"
        });
      } else {
        props.setFormValue({
          radio: "A"
        });
      }
    }
    onUpdated(() => {
      console.log("Select组件 updated, 当前值:", props.modelValue);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_select = resolveComponent("el-select");
      const _component_el_option = resolveComponent("el-option");
      _push(ssrRenderComponent(_component_el_select, mergeProps({
        "model-value": props.modelValue,
        placeholder: "请选择",
        onChange: handleSelectChange
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(options.value, (item) => {
              _push2(ssrRenderComponent(_component_el_option, {
                key: item.value,
                label: item.label,
                value: item.value
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(options.value, (item) => {
                return openBlock(), createBlock(_component_el_option, {
                  key: item.value,
                  label: item.label,
                  value: item.value
                }, null, 8, ["label", "value"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../src/components/Select/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
