import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 编译期间检查
    eslint({
      // 配置选项
      cache: false // 禁用 eslint 缓存
    })
  ]
})
