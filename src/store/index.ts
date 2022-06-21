import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'

const state = {
  isCollapse: false
}

// 使用typeof推导， 这样只要设置state初始值就可以了
export type State = typeof state

// export interface State {
//   isCollapse: boolean,
// }

// 定义 injection key
// 为了让useStore返回类型化的 store
export const key: InjectionKey<Store<State>> = Symbol('store')

// 创建一个新的 store 实例
export const store = createStore<State>({
  state,
  // state () {
  //   return {
  //     isCollapse: false
  //   }
  // },
  mutations: {
    setIsCollapse (state, payload) {
      state.isCollapse = payload
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}
