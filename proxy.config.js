module.exports = {
  '/api': {
    target: '',
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
