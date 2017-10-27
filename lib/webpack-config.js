const HtmlWebpackPlugin = require('html-webpack-plugin')
const getPort = require('./local-port')
const path = require('path')
const configHtmlPlugin = require('./config-html-plugin')

const jsLoader = require('./loaders/javascript')
const sassLoader = require('./loaders/sass')
const fileLoader = require('./loaders/file')

const makeWebpackConfig = args => {
  const port = getPort(args)
  const htmlPlugin = configHtmlPlugin(args, process.cwd())
  const webpackConfig = {
    devtool: 'eval',
    entry: {
      main: [
        `webpack-dev-server/client?http://localhost:${port}/`,
        path.resolve(process.cwd(), args.entry || 'index.js'),
      ],
    },
    stats: false,
    output: {
      filename: '[name].js',
      publicPath: '/',
    },
    plugins: [new HtmlWebpackPlugin(htmlPlugin)],
    module: {
      rules: [
        jsLoader(),
        sassLoader({ useCssModules: args.cssModules }),
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
