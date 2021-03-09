import Mock from 'mockjs'
import { createResponse } from '../helper'

Mock.mock(/\/sys\/selectRole/, () => {
  return createResponse(true, [
    { roleName: '普通用户', roleCode: 1 },
    { roleName: '会员用户', roleCode: 2 },
    { roleName: '欧皇', roleCode: 3 },
    { roleName: '非酋', roleCode: 4 },
  ])
})
