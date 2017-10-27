const ExtractTextPlugin = require('extract-text-webpack-plugin')

const noExtractConfig = config => ({
  test: /\.s?css$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        modules: config.useCssModules,
      },
    },
    {
      loader: 'sass-loader',
    },
  ],
})
const extractConfig = config => ({
  test: /\.s?css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          modules: config.useCssModules,
        },
      },
      {
        loader: 'sass-loader',
      },
    ],
  }),
})

module.exports = ({ useCssModules = false, build = false } = {}) =>
  build ? extractConfig({ useCssModules }) : noExtractConfig({ useCssModules })
