const webpack = require('webpack')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const path = require('path')
const chalk = require('chalk')
const prettyBytes = require('pretty-bytes')

module.exports = config => {
  console.log('Creating an optimised production build...')

  const compiler = webpack(config)
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err)
      }
      const messages = formatWebpackMessages(stats.toJson({}, true))
      if (messages.errors.length) {
        return reject(new Error(messages.errors.join('\n\n')))
      }
      return resolve({
        stats,
        warnings: messages.warnings,
      })
    })
  }).then(
    ({ stats }) => {
      console.log(
        chalk.green('Compiled succesfully into'),
        path.resolve(process.cwd(), 'demopack-built')
      )

      Object.keys(stats.compilation.assets)
        .filter(a => path.extname(a) !== '.map')
        .forEach(asset => {
          const obj = stats.compilation.assets[asset]
          console.log(
            '  =>',
            chalk.green(asset),
            '(' + chalk.blue(prettyBytes(obj.size())) + ')'
          )
        })
      console.log()
    },
    err => {
      console.log(chalk.red('Failed to compile.\n'))
      console.log((err.message || err) + '\n')
      process.exit(1)
    }
  )
}
