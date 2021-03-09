if (process.env.NODE_ENV === 'development' && process.env.VUE_APP_MODE === 'preview') {
  const Mock = require('mockjs')
  Mock.setup({
    timeout: '200-1000',
  })

  const originMockMethod = Mock.mock
  Mock.mock = (rurl, ...rest) => {
    const url = rurl.toString()
    // eslint-disable-next-line
    console.log(`Mock path: ${url.slice(1, url.length - 1).replace(/\\/g, '')}`)
    return originMockMethod.call(Mock, rurl, ...rest)
  }
  // eslint-disable-next-line
  console.warn('Mock server(frontend) has established!You should not use in production mode.')

  const apiModules = require.context('./mockAPI', true, /\.js$/)
  apiModules.keys().forEach(apiModules)
}
