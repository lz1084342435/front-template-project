import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from '../_utils'

enum Api {
  GET_MENU = '/get/user/info'
}

const RESULT = {
  userInfo: {
    name: '超级管理员',
    roles: 'admin',
    phoneNumber: 17788889999
  }
}

export default [
  {
    url: `/api${Api.GET_MENU}`,
    timeout: 100,
    method: 'get',
    response: () => resultSuccess(RESULT.userInfo)
  }
] as MockMethod[]
