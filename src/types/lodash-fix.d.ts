/**
 * 修复 @types/lodash 类型定义中不兼容的问题
 */

// 覆盖有问题的类型
declare module 'lodash' {
  // 简化有问题的类型定义，避免使用 TypeScript 4.9+ 才支持的特性
  type StringToNumber<T> = T extends string ? number : never;
  
  interface LoDashStatic {
    get<TObject extends object, TKey extends keyof TObject>(
      object: TObject,
      path: TKey | [TKey]
    ): TObject[TKey];
    
    get<TObject extends object, TKey extends keyof TObject>(
      object: TObject | null | undefined,
      path: TKey | [TKey]
    ): TObject[TKey] | undefined;
    
    get<TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof TObject[TKey1]>(
      object: TObject,
      path: [TKey1, TKey2]
    ): TObject[TKey1][TKey2];
    
    // 其余重载省略，只覆盖基本功能
  }
}

// 同样处理 lodash.clonedeep 模块
declare module 'lodash.clonedeep' {
  const cloneDeep: <T>(value: T) => T;
  export = cloneDeep;
} 