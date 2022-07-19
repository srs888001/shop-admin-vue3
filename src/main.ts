import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { store, key } from './store'
import elementPlus from './plugins/element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

// 加载全局样式
import './styles/index.scss'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(store, key)
app.use(elementPlus)
app.use(VXETable)

// 自动注册全局组件
const modules = import.meta.globEager('./components/**/index.ts')
for (const path in modules) {
  app.use(modules[path].default)
}

app.mount('#app')
