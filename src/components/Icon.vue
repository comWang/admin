<template>
  <div class="svg-icon" :style="`width:${size}px;height:${size}px;`">
    <svg :width="size" :height="size">
      <use :href="`#icon-${name}`" />
    </svg>
    <span v-show="number !== null" :class="['badge', position]">{{ number }}</span>
  </div>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    size: {
      type: String,
      default: '32',
    },
    name: {
      type: String,
      default: 'empty',
    },
    number: {
      type: Number,
      default: null,
    },
    position: {
      type: String,
      default: 'bottom-right',
    },
  },
}
</script>

<style lang="less" scoped>
.svg-icon {
  box-sizing: border-box;
  position: relative;
  top: 0;
  left: 0;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .badge {
    position: absolute;
    height: 14px;
    padding: 0 5px;
    font-size: 12px;
    color: @light;
    line-height: 14px;
    background-color: #74c7b8;
    border-radius: 7px;
    &.top-right {
      top: -5px;
      right: -10px;
    }
    &.bottom-right {
      bottom: -5px;
      right: -10px;
    }
  }
}
</style>
