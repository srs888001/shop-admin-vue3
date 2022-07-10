import { App } from 'vue'
import Component from './index.vue'

export default {
  install (app: App) {
    console.log('AppPagination')
    app.component('AppPagination', Component)
  }
}
