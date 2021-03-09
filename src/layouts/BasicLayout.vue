<template>
  <div class="basic-layout">
    <Aside />
    <div class="main">
      <Header />
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Aside from '@/components/Aside'
import Header from '@/components/Header'

export default {
  components: {
    Aside,
    Header,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['isCollapse', 'isMobile']),
  },
}
</script>

<style lang="less">
.basic-layout {
  display: flex;
  .main {
    width: calc(100vw - @asidebar-width);
  }
}
</style>