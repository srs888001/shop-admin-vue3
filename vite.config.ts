import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
// 注意：在 ts 模块中加载 node 核心模块需要安装 node 的类型补充模块：yarn add -D @types/node
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 编译期间检查
    eslint({
      // 配置选项
      cache: false // 禁用 eslint 缓存
    }),
    vueJsx({
      // 配置选项
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
