module.exports = {
  '/api': {
    target: 'http://localhost:9100',
    changeOrigin: true
  },
  '/json': {
    target: 'https://nas.wangyuxin.tech:9211',
    changeOrigin: true
  },
  '/static': {
    index: './public/static',
  },
  '/v1': {
    target: 'http://api.weatherapi.com',
    changeOrigin: true
  }
};
