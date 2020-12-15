import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import storage from 'store'
import { ACCESS_TOKEN } from './store/types'
import { setDocumentTitle } from '@/utils/common'

// 配置顶部加载进度条
NProgress.configure({ showSpinner: false })

const loginRoutePath = '/user/login'
const whiteList = [loginRoutePath] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start()
  to.meta && to.meta.title && setDocumentTitle(to.meta.title)
  // 没有session_token
  if (!storage.get(ACCESS_TOKEN)) {
    // 免认证路由直接放过
    if (whiteList.includes(to.path)) next()
    else {
      next({ path: loginRoutePath })
      NProgress.done()
    }
    return
  } else {
    if (to.path === loginRoutePath) {
      next({ path: '/' })
      NProgress.done()
    }
    else next()
  }
})

router.afterEach(() => {
  NProgress.done()
})