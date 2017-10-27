const HtmlWebpackPlugin = require('html-webpack-plugin')
const getPort = require('./local-port')
const path = require('path')
const configHtmlPlugin = require('./config-html-plugin')

const makeWebpackConfig = args => {
  const port = getPort(args)
  const htmlPlugin = configHtmlPlugin(args, process.cwd())
  const webpackConfig = {
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
  }

  return webpackConfig
}

module.exports = makeWebpackConfig
