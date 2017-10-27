module.exports = ({ useCssModules = false } = {}) => ({
  test: /\.s?css$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        modules: useCssModules,
      },
    },
    {
      loader: 'sass-loader',
    },
  ],
})
