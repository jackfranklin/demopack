const HtmlWebpackPlugin = require('html-webpack-plugin')
const getPort = require('./local-port')
const path = require('path')
const configHtmlPlugin = require('./config-html-plugin')
const shelljs = require('shelljs')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const jsLoader = require('./loaders/javascript')
const sassLoader = require('./loaders/sass')
const fileLoader = require('./loaders/file')

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const buildPath = path.resolve(process.cwd(), 'demopack-built')

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
      path: buildPath,
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin(htmlPlugin),
      args.build
        ? new CleanWebpackPlugin(buildPath, {
            root: path.resolve(process.cwd()),
            verbose: false,
          })
        : null,
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
      modules: ['node_modules', path.join(__filename, '..', '../node_modules')],
    },
    resolveLoader: {
      modules: [
        // TODO: there has to be a nicer way...
        path.join(__filename, '..', '../node_modules'),
      ],
      extensions: ['.js', '.json'],
      mainFields: ['loader', 'main'],
    },
  }

  return webpackConfig
}

module.exports = makeWebpackConfig
