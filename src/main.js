import Vue from 'vue'
import VueRouter from 'vue-router'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/event'
import './vue.directives'
import './permission'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(elementUi)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
