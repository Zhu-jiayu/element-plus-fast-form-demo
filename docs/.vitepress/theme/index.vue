<template>
  <div style="min-height:100vh;display:flex;flex-direction:column;">
    <div style="height:56px;display:flex;align-items:center;padding-left:24px;background:#fff;box-shadow:0 2px 8px #f0f1f2;z-index:10;position:sticky;top:0;">
      <a href="/useForm" style="display:flex;align-items:center;text-decoration:none;">
        <span style="font-weight:bold;font-size:20px;color:#333;">element-plus-fast-form1</span>
      </a>
    </div>
    <div style="display:flex;flex:1;">
      <aside style="width:220px;background:#fafbfc;border-right:1px solid #eee;padding:24px 0;">
        <!-- 这里插入 sidebar -->
        <slot name="sidebar" />
      </aside>
      <main style="flex:1;padding:32px;min-width:0;">
        <slot />
      </main>
    </div>
  </div>
</template>
<script setup>
// 这里不再引入 Layout
</script>
