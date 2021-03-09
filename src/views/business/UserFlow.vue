<script>
import Pagination from '@/components/Pagination'
// 为每个tab指定唯一的id
let uid = 0

function PrimaryPage() {
  // eslint-disable-next-line
  const h = this.$createElement
  return (
    <div>
      <el-table v-loading={this.isLoading} data={this.tableData} element-loading-spinner="el-icon-loading" stripe>
        <el-table-column prop="rank" label="排序" />
        <el-table-column prop="name" label="名称" />
        <el-table-column
          prop="imgs"
          label="图片"
          scopedSlots={{
            default: scope => (
              <p class="operate-link" title="点击可以编辑" onclick={() => this.viewPictures(scope.row)}>
                {scope.row.imgs}
              </p>
            ),
          }}
        />
        <el-table-column
          prop="devices"
          label="设备"
          scopedSlots={{
            default: scope => (
              <p class="operate-link" title="点击可以编辑" onclick={() => this.viewEquipments(scope.row)}>
                {scope.row.devices}
              </p>
            ),
          }}
        />
      </el-table>
    </div>
  )
}

function EquipmentPage(props = {}) {
  // eslint-disable-next-line
  const h = this.$createElement
  return <h1 props={{ ...props }}>EquipmentPage</h1>
}

function PicturePage(props = {}) {
  // eslint-disable-next-line
  const h = this.$createElement
  return <h1 props={{ ...props }}>PicturePage</h1>
}

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      currentTab: 'primary',
      tabs: [],
      tableData: null,
    }
  },
  created() {
    this.queryTableData()
  },
  methods: {
    queryTableData() {
      this.tableData = [
        { name: '后端', rank: 3, imgs: 1, devices: 5 },
        { name: '前端', rank: 1, imgs: 5, devices: 2 },
        { name: '中台', rank: 2, imgs: 3, devices: 7 },
      ]
    },
    toggleTab(tab) {
      const { name } = tab
      this.currentTab = name
      if (name === 'primary') this.queryTableData()
    },
    removeTab(name, instantlyRefresh) {
      const ind = this.tabs.findIndex(tab => tab.name === name)
      if (ind >= 0) this.tabs.splice(ind, 1)
      this.toggleTab(this.tabs[this.tabs.length - 1])
      if (instantlyRefresh) this.queryTableData()
    },
    viewPictures(row) {
      const { name } = row
      const newTabName = (uid++).toString()
      this.tabs.push({
        title: `${name}-图片展示`,
        name: newTabName,
        render: vm => PicturePage.call(vm, { title: name, tabName: newTabName }),
      })
      this.currentTab = newTabName
    },
    viewEquipments(row) {
      const { name } = row
      const newTabName = (uid++).toString()
      this.tabs.push({
        title: `${name}-设备展示`,
        name: newTabName,
        render: vm => EquipmentPage.call(vm, { title: name, tabName: newTabName }),
      })
      this.currentTab = newTabName
    },
  },
  // eslint-disable-next-line
  render(h) {
    if (!this.tabs[0]) {
      const { meta } = this.$router.currentRoute
      this.tabs.push({
        title: (meta && meta.title) || '未命名',
        name: 'primary',
        render: vm => PrimaryPage.call(vm),
      })
    }
    return (
      <div class="custom-tabs">
        <el-tabs value={this.currentTab} type="card" ontab-remove={this.removeTab} ontab-click={this.toggleTab}>
          {this.tabs.map(tab => (
            <el-tab-pane
              key={tab.name}
              label={tab.title}
              name={tab.name}
              closable={tab.name === 'primary' ? false : true}
            >
              {tab.render ? tab.render(this) : null}
            </el-tab-pane>
          ))}
        </el-tabs>
      </div>
    )
  },
}
</script>

<style lang="less" scoped>
.paralleling {
  display: flex;
  align-items: center;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 14px;
  .left {
    display: flex;
    align-items: center;
    padding: 10px 0;
    font-size: 14px;
  }
  .input {
    width: 180px;
    margin-right: 20px;
  }
}

.operate-link {
  color: @primary;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
}
</style>
