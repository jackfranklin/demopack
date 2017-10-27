const defaultOpts = { inject: 'body', cache: false }

module.exports = (args, pwd) => {
  // left here in case we need to do more with HTMLWebpackPlugin
  return Object.assign({}, defaultOpts, { title: args.title })
}
