import { BasicLayout, PageView, BlankLayout } from '@/layouts'
import ExceptionPage404 from '@/views/error/404'
import Login from '@/views/user/Login'

const viewList = {
  home: () => import('@/views/dashboard/Home'),
  test: () => import('@/views/dashboard/test'),

  exception404: () => import(/* webpackChunkName: "fail" */'@/views/error/404'),
}

export const asyncRoutes = [
  {
    path: '/',
    name: 'root',
    component: BasicLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: PageView,
        redirect: '/dashboard/home',
        children: [
          {
            path: 'home',
            name: 'home',
            component: viewList.home,
            meta: {
              title: '主页',
            },
          },
          {
            path: 'test',
            name: 'test',
            component: viewList.test,
            meta: {
              title: '测试',
            },
          },
        ],
      },
    ],
  },
]

// 基础路由，与业务逻辑基本无关
export const constantRoutes = [
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
  {
    path: '/404',
    component: ExceptionPage404,
  },
  {
    path: '*',
    redirect: '/404',
  },
]