<template>
  <div style="padding:30px">
    <el-table
      v-loading="isLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.5)"
      :data="roles"
      style="min-height: 500px"
      stripe
    >
      <el-table-column prop="roleName" label="角色名称"> </el-table-column>
      <el-table-column prop="roleCode" label="角色编码"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { selectRole, deleteRole, selectAuthList, selectAuthByRoleId } from '@/api/role'

export default {
  data() {
    return {
      isLoading: false,
      roles: null,
    }
  },
  created() {
    this.queryRoles()
  },
  methods: {
    ...mapMutations(['setAuthSchema']),
    changePage(page) {
      this.page = page
      this.queryRoles()
    },
    async queryRoles() {
      this.isLoading = true
      const [err, res] = await selectRole()
      if (err) return
      this.roles = res.data
      setTimeout(() => {
        this.isLoading = false
      }, 200)
    },
  },
}
</script>

<style lang="less" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: @gap 0;
  font-size: 14px;
  .left {
    display: flex;
    align-items: center;
    padding: @gap 0;
    font-size: 14px;
  }
  .input {
    width: 200px;
    padding: 0 20px;
  }
}

.pagination {
  margin-top: @gap;
  text-align: center;
  .pointer {
    padding: @gap;
    color: @primary;
  }
}
</style>
