import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from '../_utils'

enum Api {
  GET_MENU = '/system/get/menu/list'
}

const RESULT = {
  menuList: [
    {
      path: '/system',
      name: 'system',
      component: 'LAYOUT',
      meta: {
        title: '系统',
        icon: 'system'
      },
      alwaysShow: true,
      children: [
        {
          path: 'user',
          name: 'systemUser',
          component: '/system/user',
          meta: {
            title: '用户',
            affix: false,
            isCache: false
          }
        }
      ]
    }
  ]
}

export default [
  {
    url: `/api${Api.GET_MENU}`,
    timeout: 100,
    method: 'get',
    response: () => resultSuccess(RESULT.menuList)
  }
] as MockMethod[]
