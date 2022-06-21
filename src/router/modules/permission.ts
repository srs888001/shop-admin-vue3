// src\router\modules\permission.ts

import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'permission',
  name: 'permission',
  component: RouterView,
  meta: {
    title: '权限'
  },
  children: [
    {
      path: 'role',
      name: 'permission-role',
      component: () => import('@/views/permission/role/index.vue'),
      meta: {
        title: '角色'
      }
    },
    {
      path: 'admin',
      name: 'permission-admin',
      component: () => import('@/views/permission/admin/index.vue'),
      meta: {
        title: '管理'
      }
    },
    {
      path: 'rule',
      name: 'permission-rule',
      component: () => import('@/views/permission/rule/index.vue'),
      meta: {
        title: '规则'
      }
    }
  ]
}

export default routes
