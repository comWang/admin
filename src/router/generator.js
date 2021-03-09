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
    // eslint-disable-next-line
    render(h) {
      return <router-view />
    },
  },
}

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
