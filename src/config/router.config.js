import { BlankLayout } from '@/layouts'
import Login from '@/views/logIn/Login'

// 基础路由，与业务逻辑基本无关
export const basicRoutes = [
  {
    path: '/user',
    name: 'user',
    component: BlankLayout,
    redirect: '/user/login',
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: Login,
      },
    ],
  },
]
