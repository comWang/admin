<template>
  <div class="login-page">
    <div class="form-wrapper">
      <p class="title">Login</p>
      <el-form v-loading="isLoading" :model="form" ref="form" label-width="100px" label-position="top">
        <el-form-item prop="username" label="账号" :rules="[{ required: true, message: '请输入账号' }]">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" :rules="[{ required: true, message: '请输入密码' }]">
          <el-input v-model="form.password" type="password" @keyup.enter.native="submit"></el-input>
        </el-form-item>
      </el-form>
      <el-button class="submit" type="primary" @click="submit">登录</el-button>
    </div>
    <div class="decoration-layer">
      <div class="top">
        <p>welcome</p>
        <p>后台管理系统</p>
      </div>
      <p class="bottom">Copyright © 2018-{{ new Date().getFullYear() }} Powered by  comwang.github.io</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      isLoading: false,
      form: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapActions(['getPermissions', 'login']),
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.isLoading = true
          this.login({ ...this.form })
            .then(() => {
              this.$notify({
                message: '登录成功，即将进入主页面',
                type: 'success',
              })
              this.getPermissions().then(() => {
                this.$router.push({ path: '/' })
              })
            })
            .catch(err =>
              this.$message({
                type: 'error',
                message: err.message,
              })
            )
            .finally(() => (this.isLoading = false))
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login-page {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-color: #74c7b8;
  font-family: 'PingFangSC-Medium', 'PingFang SC';
}

.form-wrapper {
  position: absolute;
  z-index: 5;
  left: 50%;
  padding: 60px 30px;
  width: 380px;
  background-color: #fff;
  border-radius: 8px;
  .title {
    margin-bottom: 50px;
    font-size: 30px;
    text-align: center;
    color: @primary;
  }
  .submit {
    display: block;
    width: 60%;
    height: 50px;
    margin: 50px auto 0 auto;
    border-radius: 25px;
    font-size: 20px;
  }
}

.decoration-layer {
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 980px;
  height: 450px;
  padding: 80px;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  border-radius: 8px;
  img {
    display: block;
    width: 158px;
    height: 65px;
    margin: auto;
  }
  .top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 320px;
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 5px;
  }
  .bottom {
    font-size: 12px;
  }
}
</style>
