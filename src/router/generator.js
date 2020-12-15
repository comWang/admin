import { BasicLayout, PageView, BlankLayout } from '@/layouts'
import {
  PERMISSION_ADD,
  PERMISSION_DELETE,
  PERMISSION_READ,
  PERMISSION_UPDATE,
  PERMISSION_AUDIT,
  PERMISSION_UPLOAD,
  PERMISSION_EXPORT,
  PERMISSION_GRANT,
} from '@/store/types'

const layouts = {
  BasicLayout,
  PageView,
  BlankLayout,
  RouterView: {
    render(h) {
      return <router-view />
    },
  },
}

// const fakeNestedPermissions = [
//   {
//     path: '/system',
//     description: '系统管理',
//     component: 'PageView',
//     pages: [
//       {
//         path: '/setting',
//         description: '系统设置',
//         component: 'RouterView',
//         pages: [
//           {
//             path: '/RoleManage',
//             description: '角色管理',
//             component: 'setting/RoleManage',
//             permissions: [
//               {
//                 name: 'SELECT',
//                 description: '查看',
//               },
//               {
//                 name: 'ADD',
//                 description: '新增',
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     path: '/business',
//     description: '业务管理',
//     component: 'PageView',
//     pages: [
//       {
//         path: '/trace',
//         description: '用户走向统计',
//         component: 'business/UserFlow',
//         permissions: [
//           {
//             name: 'SELECT',
//             description: '查看',
//           },
//           {
//             name: 'DC',
//             description: '导出',
//           },
//         ],
//       },
//     ],
//   },
// ]

const joinPath = (path, prepend) => {
  let fullpath = ''
  if (prepend) fullpath = prepend + path
  else fullpath = path
  return fullpath.replace(/\/\//g, '/')
}

const generateRoutes = (nestedPermissions, namespace = '') => {
  if (!Array.isArray(nestedPermissions) || nestedPermissions.length < 1) return []
  const tree =
    namespace === ''
      ? [
          {
            path: '/',
            component: 'BasicLayout',
            pages: nestedPermissions,
          },
        ]
      : nestedPermissions

  return tree.map(item => ({
    path: joinPath(item.path, namespace),
    component: (item.component && layouts[item.component]) || (() => import(`@/views/${item.component}`)),
    children: item.pages && generateRoutes(item.pages, namespace ? namespace + item.path : item.path),
    redirect: item.pages && item.pages.length && joinPath(item.pages[0].path, namespace + item.path),
    meta: {
      title: item.description,
      permissions:
        item.permissions &&
        item.permissions.map(permission => {
          if (/_?ADD$/.test(permission.name)) return PERMISSION_ADD
          if (/_?DELETE$/.test(permission.name)) return PERMISSION_DELETE
          if (/_?SELECT$/.test(permission.name)) return PERMISSION_READ
          if (/_?UPDATE?$/.test(permission.name)) return PERMISSION_UPDATE
          if (/_?SP$/.test(permission.name)) return PERMISSION_AUDIT
          if (/_?CLASS$/.test(permission.name)) return PERMISSION_UPLOAD
          if (/_?EXPORT$/.test(permission.name)) return PERMISSION_EXPORT
          if (/_?UPLOAD$/.test(permission.name)) return PERMISSION_GRANT
        }),
    },
  }))
}

export default generateRoutes
