// 使antd-mobile支持服务端渲染
const withTM = require('next-transpile-modules')([
    'antd-mobile'
])

module.exports = withTM({
    // 在这里写其他Next.js的配置
})
