<template>
  <div>
    <p @click="prepareLogin">登录</p>
  </div>
</template>

<script>
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/types'
import { mapActions } from 'vuex'
  export default {
    methods: {
      ...mapActions(['login']),
      prepareLogin() {
        this.login({id: 123}).then((res) => {
          const { query } = this.$route
          storage.set(ACCESS_TOKEN, res)
          this.$notify({title: '登录成功！'})
          if (query.redirect) this.$router.replace({ path: query.redirect })
          else this.$router.replace({ path: '/' })
        })
      },
    },
  }
</script>

<style lang="less" scoped>

</style>