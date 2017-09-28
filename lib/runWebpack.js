const webpack = require('webpack')

module.exports = function runWebpack (config) {
  return new Promise((resolve, reject) => {
    return webpack(config).run((err, stats) => {
      return err ? reject(err) : resolve(stats)
    })
  })
}
