import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
// 注意：在 ts 模块中加载 node 核心模块需要安装 node 的类型补充模块：yarn add -D @types/node
import { resolve } from 'path'

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
      '@': resolve(__dirname, '/src')
    }
  },
  css: {
    preprocessorOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.sass` 这个文件
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
        additionalData: '@import "@/styles/variables.scss"'
      },
      // 猜测
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `preprocessorOptions` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  }
  // server: {
  //   proxy: {
  //     // 字符串简写写法
  //     // /foo/123 => http://localhost:4567/foo/123
  //     // '/foo': 'http://localhost:4567/foo',
  //     // 选项写法
  //     '/admin': {
  //       // /admin/login => https://shop.fed.lagounews.com/api/admin/login
  //       target: 'https://shop.fed.lagounews.com/api', // 代理的目标地址
  //       // 兼容基于名字的虚拟主机
  //       // a.com localhost:xxx
  //       // b.com localhost:xxx
  //       // HTTP 请求头部的 origin 字段
  //       // 我们在开发模式：默认的 origin 是真实的 origin：localhost:3000
  //       // changeOrigin: true，代理服务会把 origin 修改为目标地址 http://jsonplaceholder.typicode.com
  //       changeOrigin: true

  //       // 路径重写
  //       // http://jsonplaceholder.typicode.com/api/xxx
  //       //    /api/xxx => http://jsonplaceholder.typicode.com/api/xxx
  //       // http://jsonplaceholder.typicode.com/xxx
  //       //    /api/xxx => http://jsonplaceholder.typicode.com/api/xxx
  //       // rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
})
