import Mock from 'mockjs'
import { createResponse } from '../helper'

const fakeNestedPermissions = [
  {
    path: '/system',
    description: '系统管理',
    component: 'PageView',
    pages: [
      {
        path: '/setting',
        description: '系统设置',
        component: 'RouterView',
        pages: [
          {
            path: '/RoleManage',
            description: '角色管理',
            component: 'setting/RoleManage',
            permissions: [
              {
                name: 'SELECT',
                description: '查看',
              },
              {
                name: 'ADD',
                description: '新增',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/business',
    description: '业务管理',
    component: 'PageView',
    pages: [
      {
        path: '/trace',
        description: '用户走向统计',
        component: 'business/UserFlow',
        permissions: [
          {
            name: 'SELECT',
            description: '查看',
          },
          {
            name: 'DC',
            description: '导出',
          },
        ],
      },
    ],
  },
]

Mock.mock(/\/pub\/loginIn/, options => {
  return createResponse(true, {
    token: '32de85a280edf',
    role: 5,
  })
})

Mock.mock(/\/sys\/selectCatalog/, options =>
  createResponse(true, {
    userInfo: {
      nickname: '会飞的猪',
    },
    rows: fakeNestedPermissions,
  })
)
