import { defineComponent, ref, watch, resolveComponent, mergeProps, withCtx, unref, createVNode, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    formValue: {
      // 表单数据
      type: Object
    },
    modelValue: {
      // 当前组件数据
      type: String,
      default: ""
    },
    prop: {
      type: String
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const imageUrl = ref("");
    const props = __props;
    watch(
      () => props.modelValue,
      () => {
        imageUrl.value = props.modelValue;
      }
    );
    const emits = __emit;
    const getImageInfo = (file) => {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      return new Promise((resolve) => {
        fileReader.onload = function(e) {
          let base64 = this.result;
          resolve(base64);
        };
      });
    };
    const handleAvatarSuccess = (response, uploadFile) => {
      imageUrl.value = URL.createObjectURL(uploadFile.raw);
    };
    const beforeAvatarUpload = async (rawFile) => {
      if (!["image/jpeg", "image/jpg", "image/png"].includes(rawFile.type)) {
        ElMessage.error("请传图片");
        return false;
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error("Avatar picture size can not exceed 2MB!");
        return false;
      }
      const filedata = await getImageInfo(rawFile);
      imageUrl.value = filedata;
      emits("update:modelValue", filedata);
      return true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_upload = resolveComponent("el-upload");
      const _component_el_icon = resolveComponent("el-icon");
      _push(ssrRenderComponent(_component_el_upload, mergeProps({
        class: "avatar-uploader",
        action: "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",
        "show-file-list": false,
        "on-success": handleAvatarSuccess,
        "before-upload": beforeAvatarUpload
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (imageUrl.value) {
              _push2(`<img${ssrRenderAttr("src", imageUrl.value)} class="avatar" data-v-f480845a${_scopeId}>`);
            } else {
              _push2(ssrRenderComponent(_component_el_icon, { class: "avatar-uploader-icon" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Plus), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Plus))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
          } else {
            return [
              imageUrl.value ? (openBlock(), createBlock("img", {
                key: 0,
                src: imageUrl.value,
                class: "avatar"
              }, null, 8, ["src"])) : (openBlock(), createBlock(_component_el_icon, {
                key: 1,
                class: "avatar-uploader-icon"
              }, {
                default: withCtx(() => [
                  createVNode(unref(Plus))
                ]),
                _: 1
              }))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../src/components/Avatar-upload/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f480845a"]]);
export {
  index as default
};
