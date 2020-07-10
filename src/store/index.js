import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: window.innerWidth < 480 ? true : false,
    isMobile: window.innerWidth < 480,
  },
  getters: {},
  actions,
  mutations,
});