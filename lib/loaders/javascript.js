module.exports = () => ({
  test: /\.jsx?$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          require('babel-preset-env'),
          require('babel-preset-react'),
          require('babel-preset-stage-0'),
        ],
        ignore: /node_modules/,
      },
    },
  ],
})
