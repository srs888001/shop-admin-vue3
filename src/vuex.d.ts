import { Store } from 'vuex'
import { State } from './store/index'

declare module '@vue/runtime-core' {
  /// https://vuex.vuejs.org/zh/guide/typescript-support.html#vue-%E7%BB%84%E4%BB%B6%E4%B8%AD-store-%E5%B1%9E%E6%80%A7%E7%9A%84%E7%B1%BB%E5%9E%8B%E5%A3%B0%E6%98%8E
  /// 为 `this.$store` 提供类型声明
  /// 可以直接使用this.$store里面属性
  export interface ComponentCustomProperties {
    $store: Store<State>
  }
}
