import type { RouteRecordRaw } from 'vue-router'

const LAYOUT = () => import('@/layout/index.vue')

/**
 * @description 静态路由
 */
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: LAYOUT,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/home.vue'),
        meta: {
          title: '首页',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error/error-404.vue'),
    meta: {
      hidden: true
    }
  }
]

export const noMathPage = { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
