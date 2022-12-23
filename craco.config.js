const path = require('path')

const proxy = require('./proxy.config')
const CracoSwcPlugin = require('craco-swc')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const smp = new (require('speed-measure-webpack-plugin'))()
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
  webpack: smp.wrap({
    // plugins: [new BundleAnalyzerPlugin()], // 打包分析
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
  })
};
