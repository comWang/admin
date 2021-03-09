import request from '@/utils/request'

export const selectCatalog = params =>
  request({
    url: '/sys/selectCatalog',
    method: 'post',
    params,
  })

export const loginIn = params =>
  request({
    url: '/pub/loginIn',
    method: 'post',
    params,
  })
