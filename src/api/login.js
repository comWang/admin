import request from '@/utils/request'
import { filterEmptyProps } from '@/utils/common'

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
