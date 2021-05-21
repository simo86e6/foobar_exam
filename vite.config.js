const { resolve } = require('path')

module.exports = {
  base:"./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'dashboard.html'),
        about: resolve(__dirname, 'hund.html')
      },
    },
  },
};