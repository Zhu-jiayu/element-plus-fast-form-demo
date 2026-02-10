// 复用 useForm 配置，默认禁用以演示启用/禁用切换
import { attrs as useFormAttrs, formConfig as useFormConfig } from "../useForm/config";

export const attrs = {
  ...useFormAttrs,
  formProps: {
    ...useFormAttrs.formProps,
    disabled: true,
  },
};

export const formConfig = useFormConfig;
