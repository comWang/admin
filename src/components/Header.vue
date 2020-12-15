<template>
  <div class="header">
    <el-row>
      <el-col :sm="12" :xs="12">
        <div class="tabs left">
          <p
            v-for="(item, i) in categories"
            :key="i"
            :class="[active === i ? 'active ptr' : 'ptr']"
            @click="toggleTab(item, i)"
          >
            {{ item.meta && item.meta.title }}
          </p>
        </div>
      </el-col>
      <el-col :sm="12" :xs="12">
        <div class="tabs right">
          <div style="display: flex;align-items: center">
            <el-image style="width: 35px; height: 35px;border-raduis:50%" :src="avatar" fit="cover"></el-image>
            <span style="margin-left: 10px">{{nickname}}</span>
          </div>
          <p class="ptr" @click="prepareLogout">
            <i class="el-icon-switch-button"></i>
            退出
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      active: 0,
    }
  },
  computed: {
    ...mapState(['dynamicRoutes', 'avatar', 'nickname']),
    categories() {
      const { dynamicRoutes } = this
      if (!dynamicRoutes.length) return []
      if (dynamicRoutes[0]) {
        const { children } = dynamicRoutes[0]
        if (children && children.length) return children
      }
      return []
    },
  },
  watch: {
    $route: function() {
      this.mapViewToRoute()
    },
  },
  created() {
    this.mapViewToRoute()
  },
  methods: {
    ...mapMutations(['changeMenuByPath']),
    ...mapActions(['logout']),
    mapViewToRoute() {
      const { path: fullpath } = this.$router.currentRoute
      const ind = this.categories.findIndex(item => new RegExp(item.path).test(fullpath))
      if (ind > -1) this.toggleTab({ path: this.categories[ind].path }, ind)
    },
    toggleTab({ path }, ind) {
      const { path: fullpath } = this.$router.currentRoute
      if (!new RegExp(path).test(fullpath)) this.$router.push({ path })
      this.active = ind
      this.changeMenuByPath(path)
    },
    prepareLogout() {
      this.logout(this)
    },
  },
}
</script>

<style lang="less" scoped>
.theme-secondary {
  color: @secondary;
}

.tabs {
  display: flex;
  align-items: center;
  height: @headerHeight;
  padding: 0 30px;
  color: @dark;
  &.left {
    p {
      font-size: 18px;
      font-weight: 600;
    }
  }
  &.right {
    justify-content: flex-end;
  }
  i {
    font-size: 20px;
    font-weight: 600;
  }
  h1 {
    font-size: 26px;
    font-weight: 500;
  }
  p {
    padding: 0 @gap;
    &.active {
      font-size: 1.2em;
      color: @primary;
    }
    &:not(:first-child) {
      margin-left: 50px;
    }
  }
  img {
    width: 118px;
    height: 48px;
    padding: 0 @gap;
  }
}
</style>
