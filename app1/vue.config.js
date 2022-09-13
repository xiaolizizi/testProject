const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false
})
// 配置反向代理
module.exports = {
  lintOnSave: false, // 暂时关闭代码格式检测
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
}
