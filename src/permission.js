import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import router from './router';
import storage from 'store';
import { ACCESS_TOKEN } from './store/types'
import { setDocumentTitle } from '@/utils/common';

// 配置顶部加载进度条
NProgress.configure({ showSpinner: false });

const whiteList = ['login', 'register', 'registerResult']; // no redirect whitelist
const loginRoutePath = '/user/login';
const defaultRoutePath = '/dashboard/home';

router.beforeEach((to, from, next) => {
  NProgress.start();
  to.meta && to.meta.title && setDocumentTitle(to.meta.title);
  // 没有session_token
  if (!storage.get(ACCESS_TOKEN)) {
    // 免认证路由直接放过
    if (whiteList.includes(to.name)) next();
    // 跳转登录，登录成功后重定向至query的地址
    // 跳转逻辑在login页面实现
    else next({ path: loginRoutePath, query: { redirect: to.fullPath } });
    return;
  }

  // 本地存储有session_token
  // 避免二次登录。例如登录后通过地址栏再次键入登录地址，登录成功跳转后点击浏览器回退按钮；
  // 如果是token失效的情境下会执行logout操作清空token，所以会回到上一步逻辑判断。
  if (to.path === loginRoutePath) {
    next({ path: defaultRoutePath })
    // 这种被重定向，会导致跳过afterEach钩子
    NProgress.done();
  } else {
    // 进行权限控制，认证
    next()
  }
});

router.afterEach(() => {
  NProgress.done() // finish progress bar
})