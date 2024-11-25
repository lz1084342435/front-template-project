import NProgress from 'nprogress'
/*
 * 路由操作
 * */
import router from '@/router'
import { staticRoutes, noMathPage } from '@/router/constantRoutes'
// 进度条
import 'nprogress/nprogress.css'
import { useBasicStore } from '@/stores/basic'
import type { RouteRecordRaw } from 'vue-router'

const layouModules: Record<string, () => Promise<Component>> = import.meta.glob(
  '../layout/index.vue'
)
const viewsModules: Record<string, () => Promise<Component>> = import.meta.glob('../views/**/*.vue')
const _dynamicViewsModules: Record<string, Function> = Object.assign(
  {},
  { ...layouModules },
  { ...viewsModules }
)

/**
 * 后端路由 component 转换函数
 * @param dynamicViewsModules 获取目录下的 .vue、.tsx 全部文件
 * @param component 当前要处理项 component
 * @returns 返回处理成函数后的 component
 */
export function dynamicImport(dynamicViewsModules: Record<string, Function>, component: string) {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    const k = key.replace(/..\/views|../, '')
    // return k.startsWith(`${component}`) || k.startsWith(`/${component}`)
    return k === `/${component}.vue` || k === `${component}.vue`
  })
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
  }
  if (matchKeys?.length > 1) {
    return false
  }
}

/**
 * 后端路由 component 转换
 * @param routes 后端返回的路由表数组
 * @returns 返回处理成函数后的 component
 */
export function backEndComponent(routes: any) {
  if (!routes) {
    return
  }
  return routes.map((item: any) => {
    console.log('_dynamicViewsModules===', _dynamicViewsModules, item.component)

    if (item.component && item.component !== 'LAYOUT') {
      item.component = dynamicImport(_dynamicViewsModules, item.component as string)
    } else if (item.component && item.component === 'LAYOUT') {
      item.component = _dynamicViewsModules['../layout/index.vue']
    }
    console.log('item.component=', item.component)
    item.children && backEndComponent(item.children)
    console.log('item==', item)

    return item
  })
}

// 过滤异步路由
export async function filterAsyncRouter(data: RouteRecordRaw[]) {
  const basicStore = useBasicStore()
  console.log('data==', data)
  const dataItem = backEndComponent(data)
  console.log('dataItem==', dataItem)
  dataItem.forEach((route: any) => {
    router.addRoute(route)
  })
  router.addRoute(noMathPage)
  basicStore.setFilterAsyncRoutes(dataItem)
}

// 重置路由
export function resetRouter() {
  // 移除之前存在的路由
  const routeNameSet = new Set()
  router.getRoutes().forEach((fItem) => {
    if (fItem.name) {
      routeNameSet.add(fItem.name)
    }
  })
  // @ts-ignore
  routeNameSet.forEach((setItem) => router.removeRoute(setItem))
  // 新增constantRoutes
  staticRoutes.forEach((feItem) => router.addRoute(feItem))
}

// 重置登录状态
export function resetState() {
  resetRouter()
  useBasicStore().resetState()
}

// 刷新路由
export function freshRouter() {
  resetRouter()
  filterAsyncRouter([])
  // location.reload()
}

NProgress.configure({ showSpinner: false })
// 开始进度条
export const progressStart = () => {
  NProgress.start()
}
// 关闭进度条
export const progressClose = () => {
  NProgress.done()
}
