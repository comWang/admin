<script>
import { mapState } from 'vuex'
import theme from '@/config/theme.config'

export default {
  computed: {
    ...mapState([ 'menu', 'category']),
  },
  // eslint-disable-next-line
  render(h) {
    const { aside } = theme
    const { menu, category } = this
    const { path } = this.$router.currentRoute
    const menuList = menu[category] || []
    const createSubmenu = (menu) => (
      <el-submenu index={menu.path}>
        <template slot="title">
          <span slot="title">{menu.name}</span>
        </template>
        {menu.submenu.map((item) =>
          item.submenu ? (
            createSubmenu(item.path, item.submenu)
          ) : (
            <el-menu-item index={item.path}>
              <span slot="title">{item.name}</span>
            </el-menu-item>
          )
        )}
      </el-submenu>
    )

    return (
      <div class="dashboard" attrs={{ style: `background-color: ${aside.backgroundColor}` }}>
        <h1 class="logo">LOGO</h1>
        <el-menu
          default-active={path}
          onselect={this.jumpToPage}
          text-color={aside.color}
          active-text-color={aside.activeColor}
        >
          {menuList.map((item) =>
            item.submenu ? (
              createSubmenu(item)
            ) : (
              <el-menu-item index={item.path}>
                <span slot="title">{item.name}</span>
              </el-menu-item>
            )
          )}
        </el-menu>
      </div>
    )
  },
  methods: {
    jumpToPage(index) {
      this.$router.push({ path: index })
    },
  },
}
</script>

<style lang="less" scoped>
.dashboard {
  min-height: 400px;
  width: 100%;
  .logo {
    text-align: center;
    color: #fff;
  }
  & /deep/ .el-menu {
    background-color: transparent;
  }
  & /deep/ .el-menu-item:hover {
    background-color: rgba(0,0,0,0.4);
  }
  & /deep/ .el-submenu__title:hover {
    background-color: rgba(0,0,0,0.4);
  }
  & /deep/ .el-menu {
    border-right: 0;
  }
}

@media screen and (min-width: @screen-xs) {
  .dashboard:not(.el-menu--collapse) {
    width: @asidebar-width - 1px;
  }
}
</style>