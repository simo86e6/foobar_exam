const { resolve } = require('path')

module.exports = {
  base:"./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        forside: resolve(__dirname, 'forside.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        menu: resolve(__dirname, 'menu.html'),
        kurv: resolve(__dirname, 'kurv.html'),
        betaling: resolve(__dirname, 'betaling.html'),
        bekraeftelse: resolve(__dirname, 'bekraeftelse.html')
      },
    },
  },
};