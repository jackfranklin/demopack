const HtmlWebpackPlugin = require('html-webpack-plugin')
const getPort = require('./local-port')
const path = require('path')
const configHtmlPlugin = require('./config-html-plugin')

const jsLoader = require('./loaders/javascript')
const sassLoader = require('./loaders/sass')
const fileLoader = require('./loaders/file')

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const makeWebpackConfig = args => {
  const port = getPort(args)
  const htmlPlugin = configHtmlPlugin(args, process.cwd())
  const webpackConfig = {
    devtool: args.build ? 'source-map' : 'eval',
    entry: {
      main: [
        args.build
          ? null
          : `webpack-dev-server/client?http://localhost:${port}/`,
        path.resolve(process.cwd(), args.entry || 'index.js'),
      ].filter(Boolean),
    },
    stats: false,
    output: {
      filename: '[name].js',
      path: path.resolve(process.cwd(), 'demopack-built'),
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin(htmlPlugin),
      args.build ? new webpack.optimize.UglifyJsPlugin() : null,
      args.build ? new ExtractTextPlugin('styles.css') : null,
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(args.build ? 'production' : 'development'),
        },
      }),
    ].filter(Boolean),
    module: {
      rules: [
        jsLoader(),
        sassLoader({ useCssModules: args.cssModules, build: args.build }),
        fileLoader(),
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
  }

  return webpackConfig
}

module.exports = makeWebpackConfig
