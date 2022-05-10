const { createVuePlugin } = require('vite-plugin-vue2')

module.exports = {
  plugins: [createVuePlugin( /*options*/)],
  port: 3000,
  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:5000/', // 凡是遇到 /api 路径的请求，都映射到 target 属性
  //     changeOrigin: true,
  //     rewrite: (path) => path.replace(/^\/api/, '')
  //   }
  // }
}
