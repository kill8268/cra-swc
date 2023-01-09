const path = require('path')
const proxy = require('./proxy.config')
const WebpackBar = require('webpackbar')
const CracoSwcPlugin = require('craco-swc')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  devServer: {
    proxy
  },
  plugins: [
    {
      plugin: CracoSwcPlugin,
      options: {
        mode: 'usage',
        coreJs: 3,
        path: path.resolve(__dirname),
      }
    }
  ],
  webpack: {
    plugins: [
      new WebpackBar(),
      // new BundleAnalyzerPlugin() // 打包分析
    ],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@providers': path.resolve(__dirname, 'src/providers'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    },
    configure: (webpackConfig, { env, paths }) => {
      if (process.env.GENERATE_SOURCEMAP === 'false') {
        webpackConfig.devtool = false
      } 
      webpackConfig.optimization.minimizer = [
        new ESBuildMinifyPlugin({
          target: 'es2015',
          css: true,
          implementation: require('esbuild')
        })
      ]
      return webpackConfig
    }
  }
};
