import storage from 'store'
import { ACCESS_TOKEN, USER_ROLE_NAME } from '@/store/types'
import createDynamicRoutes from '@/router/generator'
import Exception404 from '@/views/error/404'
import router from '@/router'

/**
 * Menu <String: name, String: path, ?Menu: submenu>[]
 * @param {Array} routes 
 * @return Menu
 */
const getMenuFromRoutes = routes =>
  routes.map(route => {
    const menu = {
      name: (route.meta && route.meta.title) || '未命名',
      path: route.path,
    }
    if (route.children && route.children.length) menu.submenu = getMenuFromRoutes(route.children)
    return menu
  })


export default {
  setUserProfile(state, payload) {
    state.nickname = payload.nickname
    state.avatar = payload.avatar
  },
  setUserInfo(state, payload) {
    storage.set('role', payload.role)
    storage.set('phone', payload.phone)
    storage.set(ACCESS_TOKEN, payload.token)
    storage.set(USER_ROLE_NAME, payload.roleName)
  },
  clearUserInfo() {
    storage.remove(ACCESS_TOKEN)
    storage.remove(USER_ROLE_NAME)
    storage.remove('role')
    storage.remove('phone')
  },
  setPermissions(state, permissions) {
    const menu = {}
    const routes = createDynamicRoutes(permissions)
    if (routes.length) {
      const { children } = routes[0] || {}
      children &&
        children.forEach(route => {
          menu[route.path] = route.children && getMenuFromRoutes(route.children)
        })
    }
    const dynamicRoutes = routes.concat([
      {
        path: '*',
        component: Exception404,
      },
    ])
    state.menu = menu
    state.dynamicRoutes = dynamicRoutes
    router.addRoutes(dynamicRoutes)
  },
  changeMenuByPath(state, path) {
    state.category = path
  },
}
