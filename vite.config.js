// vite.config.js

// 【vite】vite.defineConfig is not a function/npm无法安装第三方包问题
// https://blog.csdn.net/Xiang_Gong_Ya_/article/details/134272387


import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // 一定要匯入才能解析 vue
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [vue()],  // 使用 vue
  plugins: [vue({ template: { precompileRoot: false } })],  // vue3.4配置

  build: {
    minify: true,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // 部屬到 Github Page 設定倉庫路徑
  // base: process.env.NODE_ENV === 'production' ? '/joy-toys/' : './',

  // 清除 console 警告訊息: Feature flag __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ is not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.
  // https://blog.csdn.net/cg_ssh/article/details/135396904
  define: {
    // enable hydration mismatch details in projection build
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  }
});