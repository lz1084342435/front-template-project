import request from '@/utils/request'

// mock获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/get/user/info',
    method: 'get'
  })
}

// mock获取动态菜单
export const getMenuList = () => {
  return request({
    url: '/system/get/menu/list',
    method: 'get'
  })
}
