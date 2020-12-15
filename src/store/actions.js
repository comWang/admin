import request from '@/utils/request'
import storage from 'store'
import { selectCatalog, loginIn } from '@/api/login'

export default {
  login({ commit }, params) {
    return new Promise(async (resolve, reject) => {
      const [err, res] = await loginIn(params)
      if (res && res.flag) {
        commit('setUserInfo', {
          token: res.data.token,
          role: res.data.role,
          phone: params.username,
        })
        resolve()
      } else {
        reject(new Error(err || (res && res.message)))
      }
    })
  },
  logout({ commit }, vm) {
    vm.$confirm('注销本次登录？', '退出确认', {
      distinguishCancelAndClose: true,
      confirmButtonText: '是',
      cancelButtonText: '否',
    })
      .then(() => {
        commit('clearUserInfo')
        window.location.reload()
      })
      .catch()
  },
  getPermissions({ commit }) {
    return new Promise(async (resolve, reject) => {
      const [role, token, phone] = [storage.get('role'), storage.get('token'), storage.get('phone')]
      if (!token) {
        reject()
        return
      }
      const [err, res] = await selectCatalog({
        role,
        token,
        phone,
      })
      if (res && res.flag) {
        commit('setPermissions', res.data.rows)
        commit('setUserProfile', res.data.userInfo)
        resolve()
      } else reject(new Error(err || (res && res.message)))
    })
  },
}
