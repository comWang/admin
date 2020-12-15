<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created() {
    this.getPermissions()
  },
  methods: {
    ...mapActions(['getPermissions']),
  },
}
</script>

<style lang="less">
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC,
    Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @darker;
  #nprogress .bar {
    background-color: @secondary;
  }
}

p,
ul,
li {
  padding: 0;
  margin: 0;
}

.link {
  color: @primary;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
}

.ptr {
  &:hover {
    cursor: pointer;
  }
}
</style>
