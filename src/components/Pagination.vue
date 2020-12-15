<template>
  <div class="pagination" v-if="pages > 1">
    <i @click="operate('-')" class="el-icon-arrow-left pointer"></i>
    <div>
      <el-input class="input" v-model="page" @input="handleInput" @change="onPageChange"></el-input>
      <span class="separator">/</span>
      <span>{{pages}}</span>
    </div>
    <i @click="operate('+')" class="el-icon-arrow-right pointer"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: '1',
    }
  },
  props: {
    size: Number,
    total: Number,
  },
  computed: {
    pages() {
      const { size, total } = this
      if (!isNaN(parseInt(size)) && !isNaN(parseInt(total))) {
        return Math.ceil(total / size)
      }
      return 0
    },
  },
  methods: {
    operate(type) {
      if (type === '-') {
        const num = parseInt(this.page, 10)
        if (num <= 1) return
        this.page = `${num - 1}`
      }else if (type === '+') {
        const num = parseInt(this.page, 10)
        if (num >= this.pages) return
        this.page = `${num + 1}`
      }

      this.onPageChange(this.page)
    },
    handleInput(value) {
      if (value === '') this.page = ''
      else {
        this.page = value
          .replace(/[^(0-9)|-]|(-\D+)/g, '')
          .replace(/^(-?)0+(\d+)/g, '$1$2')
          .replace(/(\d)-/g, '$1')
      }
    },
    onPageChange(value) {
      if (parseInt(value, 10) < 1) this.page = '1'
      this.$emit('pageChange', parseInt(value, 10))
    },
  },
}
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding:  @gap 0;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 @gap-s;
  }
  .separator {
    padding: 0 6px;
  }
}
.input /deep/ .el-input__inner {
  width: 48px;
  height: 24px;
  padding: 0;
  text-align: center;
  &:focus {
    border: 1px solid @primary;
  }
}
.pointer {
  &:hover {
    cursor: pointer;
  }
}
</style>