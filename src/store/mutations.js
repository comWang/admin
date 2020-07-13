export default {
  toggleAsideBar(state) {
    state.isCollapse = !state.isCollapse
  },
  deviceChange(state, { isMobile }) {
    state.isMobile = isMobile
  },
}