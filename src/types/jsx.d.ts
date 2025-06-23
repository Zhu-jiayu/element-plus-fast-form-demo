import { VNode } from 'vue';

declare global {
  namespace JSX {
    interface Element extends VNode {
      // Vue specific JSX element properties
    }
    interface ElementClass {
      $props: Record<string, any>;
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
} 