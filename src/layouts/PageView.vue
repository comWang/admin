<script>
import { mapState, mapMutations } from 'vuex'
import Footer from '@/components/global/Footer'
export default {
  name: 'PageView',
  components: {
    Footer,
  },
  render(h) {
    const { matched } = this.$route

    const breadcrumb = (
      <el-breadcrumb separator="/">
        {matched.slice(1, matched.length).map((route, i) => {
          if (i === matched.length - 1) return (
            <el-breadcrumb-item>{route.name}</el-breadcrumb-item>
          )
          return (
            <el-breadcrumb-item to={{path: route.path}}>{route.name}</el-breadcrumb-item>
          )
        })}
      </el-breadcrumb>
    )
    return (
      <div>
        <div class="breadcrumb-wrap">
        <i onclick={this.toggleAsideBar} class={this.isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'} />
        <span>{breadcrumb}</span>
        </div>
        <router-view />
        <Footer />
      </div>
    )
  },
  computed: {
    ...mapState(['isCollapse']),
  },
  methods: {
    ...mapMutations(['toggleAsideBar']),
  },
}
</script>

<style lang="less" scoped>
.breadcrumb-wrap {
  display: flex;
  height:50px;
  line-height: 50px;
  i {
    margin-right: 16px;
    line-height: 50px;
    font-size: 24px;
    height: 50px;
    width: 50px;
    &:hover {
      cursor: pointer;
      background-color: #ececec;
    }
  }
}

.el-breadcrumb__item {
  line-height: 50px;
  font-size: 16px;
}
</style>
