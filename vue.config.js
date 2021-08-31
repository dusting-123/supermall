module.express = {
  configureWebPack: {
    resolve: {
      alias:{
        '@': 'src',
        'assets': '@/assets',
        'components': 'src/components',
        'page':'src/page',
        'network': 'src/network'
      }
    }
  },
  css: {
    loaderOptions: {
        postcss: {
            plugins: [
                // 设计稿宽度的1/10，一般为75
                require('postcss-px2rem')({remUnit: 75}),
            ]
        }
    }
}
}