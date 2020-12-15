import request from '@/utils/request'

// 角色列表
export const selectRole = () =>
  request({
    url: '/sys/selectRole',
  })
