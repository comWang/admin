import store from '@/store'

const isMobile = num => (num <= 479 ? true : false);
let primaryDevice = isMobile(window.innerWidth);
window.onresize = () => {
  const device = isMobile(window.innerWidth);
  if (device !== primaryDevice) {
    // 动态设定设备模式： 手机 | pc
    store.commit('deviceChange', { isMobile: device });
    primaryDevice = device;
  }
}