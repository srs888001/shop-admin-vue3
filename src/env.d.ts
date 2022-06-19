/// <reference types="vite/client" />
// https://vitejs.cn/guide/features.html#client-types
// 这将会提供以下类型定义补充：

// 资源导入 (例如：导入一个 .svg 文件)
// import.meta.env 上 Vite 注入的环境变量的类型定义
// import.meta.hot 上的 HMR API 类型定义

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// https://cn.vitejs.dev/guide/env-and-mode.html
// eslint-disable-next-line no-unused-vars
interface ImportMetaEnv {
  VITE_API_BASEURL: string
  // 更多环境变量...
}
