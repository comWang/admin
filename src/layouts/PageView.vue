<script>
import { mapState } from 'vuex'

export default {
  name: 'PageView',
  // eslint-disable-next-line
  render(h) {
    return (
      <div class="box">
        <div class="page">
          <router-view />
        </div>
      </div>
    )
  },
  computed: {
    ...mapState(['isCollapse']),
  },
}
</script>

<style lang="less" scoped>
.box {
  overflow: auto;
  box-sizing: border-box;
  height: calc(100vh - 60px);
  padding: 30px;
  background-color: @light;
  border-top: 1px solid @light;
}
.page {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 4px 4px 10px 0px rgba(218, 218, 218, 0.5);
  .custom-tabs /deep/ .el-tabs__header {
    background-color: @light;
  }
  .custom-tabs /deep/ .el-tabs__item.is-top {
    border-radius: 6px 6px 0 0;
    &.is-active {
      background-color: #fff;
    }
  }
  .custom-tabs /deep/ .el-tab-pane {
    padding: 30px;
  }
}
</style>
