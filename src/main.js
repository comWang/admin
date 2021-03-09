import Vue from 'vue'
import VueRouter from 'vue-router'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import Icon from '@/components/Icon'
import router from './router'
import store from './store'
import debug from '@/utils/debug'
import './vue.directives'
import './permission'
import './mock'

const webpackContextModule = require.context('./assets/icons', false, /\.svg$/)
webpackContextModule.keys().forEach(webpackContextModule)
Vue.config.productionTip = false
Vue.component(Icon.name, Icon)
Vue.use(VueRouter)
Vue.use(elementUi)
Vue.prototype.$debug = debug

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
