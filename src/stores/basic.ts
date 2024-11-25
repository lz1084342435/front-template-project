import type { RouteRecordRaw } from 'vue-router'
import type { StoreDefinition } from 'pinia'
import { staticRoutes } from '@/router/constantRoutes'
import settings from '@/settings'

interface BasicStoreState {
  token: string
  allRoutes: RouteRecordRaw[]
  filterAsyncRoutes: RouteRecordRaw[]
  cachedViews: string[]
  sidebar: {
    opened: boolean
  }
  reactiveSettings: typeof settings
  roles: string[]
}

export const useBasicStore: StoreDefinition<'basic', BasicStoreState> = defineStore(
  'basic',
  () => {
    const token = ref<string>('')
    const filterAsyncRoutes = ref<RouteRecordRaw[]>([])
    const allRoutes = ref<RouteRecordRaw[]>([])
    const cachedViews = ref<string[]>([])
    const sidebar = reactive<{ opened: boolean }>({
      opened: true
    })
    const reactiveSettings = reactive(settings)
    const roles = reactive<string[]>([])
    const setToken = (data: string) => {
      token.value = data
    }
    const setRoles = (data: string) => {
      roles.push(data)
    }
    const setFilterAsyncRoutes = (routes: RouteRecordRaw[]) => {
      filterAsyncRoutes.value = routes
      allRoutes.value = staticRoutes.concat(routes)
      console.log(' allRoutes.value===', allRoutes.value)
    }
    const addCachedView = (view: string) => {
      if (unref(cachedViews).includes(view)) {
        return
      }
      cachedViews.value.push(view)
    }
    const delCachedView = (view: string) => {
      const index = unref(cachedViews).indexOf(view)
      index > -1 && cachedViews.value.splice(index, 1)
    }
    const setToggleSideBar = () => {
      sidebar.opened = !sidebar.opened
    }
    const resetState = () => {
      token.value = ''
      allRoutes.value = []
      filterAsyncRoutes.value = []
      cachedViews.value = []
      sidebar.opened = true
    }
    return {
      token,
      allRoutes,
      filterAsyncRoutes,
      cachedViews,
      sidebar,
      reactiveSettings,
      roles,
      setRoles,
      setToken,
      setFilterAsyncRoutes,
      addCachedView,
      delCachedView,
      setToggleSideBar,
      resetState
    }
  },
  {
    persist: {
      key: 'basic-info-key',
      storage: localStorage,
      pick: ['token']
    }
  }
)
