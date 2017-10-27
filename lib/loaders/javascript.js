module.exports = () => ({
  test: /\.jsx?$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['env', 'react', 'stage-0'],
        ignore: /node_modules/,
      },
    },
  ],
})
