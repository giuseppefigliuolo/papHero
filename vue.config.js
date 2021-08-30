const path = require('path')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  transpileDependencies: ['vuetify'],
  chainWebpack: (config) => {
    config.module.rules.delete('svg')

    config.plugin('VuetifyLoaderPlugin').tap((args) => [
      {
        match(originalTag, { kebabTag, camelTag, path, component }) {
          if (kebabTag.startsWith('core-')) {
            return [
              camelTag,
              `import ${camelTag} from '@/components/core/${camelTag.substring(
                4
              )}.vue'`
            ]
          }
        }
      }
    ])
  },
  configureWebpack: {
    mode: 'development',
    optimization: {
      nodeEnv: 'production',
      minimize: true
    },
    performance: {
      maxAssetSize: 300000
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'vue-svg-loader'
        }
      ]
    },
    resolve: {
      alias: {
        '@c': path.resolve(__dirname, '/src/components'),
        '@a': path.resolve(__dirname, '/src/assets'),
        '@v': path.resolve(__dirname, '/src/views')
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/_variables.scss";`
      }
    }
  }
}
