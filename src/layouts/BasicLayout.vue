<template>
  <div>
    <Header />
    <div class="container">
      <div v-if="!isMobile" class="dashboard-wrap">
        <Dashboard />
      </div>
      <el-drawer v-if="isMobile"
        :visible="!isCollapse"
        @close="toggleAsideBar"
        direction="ltr"
        size="60%">
        <Dashboard />
      </el-drawer>
      <div :class="['main', isCollapse ? 'collapsed' : '']">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Dashboard from '@/components/Dashboard';
import Header from '@/components/global/Header';
import theme from '@/config/theme.config'

const menuList = [
  { icon: 'el-icon-s-unfold' },
  { name: '导航一', icon: 'el-icon-location' },
  { name: '导航二', icon: 'el-icon-document' },
];
export default {
  components: {
    Dashboard,
    Header,
  },
  data() {
    return {
      menuList,
    };
  },
  computed: {
    ...mapState(['isCollapse', 'isMobile']),
  },
  methods: {
    ...mapMutations(['toggleAsideBar'])
  }
};
</script>

<style lang="less">
@import url('./../global.less');

.container {
  position: relative;
  .dashboard-wrap {
    position: absolute;
    left: 0;
    top: 0;
  }
  .main {
    transition: margin-left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    margin-left: 0;
  }
}
@media screen and (min-width: @screen-xs) {
  .main:not(.collapsed) {
    margin-left: @asidebar-width;
  }
  .main.collapsed {
    margin-left: 64px;
  }
}
</style>