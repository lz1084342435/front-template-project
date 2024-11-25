import settings from './settings'
import router from '@/router'
import { progressClose, progressStart, filterAsyncRouter } from '@/composables/use-permission-hooks'
import { getUserInfo, getMenuList } from '@/api/demo'
import { useBasicStore } from '@/stores/basic'

// 路由进入前拦截
// to:将要进入的页面 vue-router4.0 不推荐使用next()
router.beforeEach(async (to) => {
  progressStart()
  // 添加动态路由
  // NOTE: 模板项目为false，引入模板后续需要修改为true，自定义非登录状态的逻辑
  const basicStore = useBasicStore()
  if (!settings.isNeedLogin) {
    await filterAsyncRouter([])
  }
  if (settings.isNeedLogin) {
    if (basicStore.roles.length === 0) {
      try {
        const userInfo = await getUserInfo()
        basicStore.setRoles(userInfo.data.roles)
        const routes = await getMenuList()
        console.log('routes.data==', routes.data)
        await filterAsyncRouter(routes.data)
        return { ...to, replace: true }
      } catch (e) {
        console.error(`route permission error${e}`)
        basicStore.resetState()
        progressClose()
        return true
        // return `/login?redirect=${to.path}`
      }
    } else {
      return true
    }
  } else {
    return true
  }
  // NOTE: 项目-判断拦截场景，根据业务拦截
})
// 路由进入后拦截
router.afterEach(() => {
  progressClose()
})
