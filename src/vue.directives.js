import Vue from 'vue'

const action = Vue.directive('action', {
  inserted(el, binding, vnode) {
    const { context } = vnode
  },
})

export { action }