const fs = require('fs')

exports.isFile = filePath => {
  const stats = fs.statSync(filePath)
  return stats.isFile()
}

exports.readFile = filePath => fs.readFileSync(filePath, 'utf8')

exports.writeFile = (filePath, contents) =>
  fs.writeFileSync(filePath, contents, { encoding: 'utf8' })
