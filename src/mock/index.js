const Mock = require('mockjs')
Mock.setup({
  timeout: '200-1000',
})

const originMockMethod = Mock.mock
Mock.mock = (rurl, ...rest) => {
  console.log(`mock: ${rurl.toString()}`)
  return originMockMethod.call(Mock, rurl, ...rest)
}
console.log('Mock server has established!')

require('./api/login')
require('./api/role')