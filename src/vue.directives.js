import Vue from 'vue'

Vue.directive('auth', {
  inserted: function(el, binding, vnode) {
    const { context } = vnode
    const { value } = binding
    const { path, meta } = context.$router.currentRoute
    const permissions = meta && meta.permissions
    // value即对应的操作需要的权限，若meta.permissions中已有的权限列表中没有该权限，择删除该节点；
    if (!permissions || !permissions.length || !permissions.includes(value)) {
      el.parentNode.removeChild(el)
      if (process.env.NODE_ENV !== 'production') {
        console.log(`操作按钮已被移除，因为不具有${value}权限；页面路径：${path}`)
      }
    }
  },
})

