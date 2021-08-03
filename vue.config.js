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
  }
}