const webpack = require('webpack')
const ProgressBar = require('progress')
const chalk = require('chalk')

module.exports = function buildProgress () {
  let building = false
  let startTime = 0
  let lastPercent = 0

  const barLeft = chalk.bold('[')
  const barRight = chalk.bold(']')
  const barFormat = chalk.cyan.bold('  build ') + barLeft + ':bar' + barRight + chalk.green.bold(' :percent')
  const barOptions = {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: 100,
    clear: true
  }

  const bar = new ProgressBar(barFormat, barOptions)

  return new webpack.ProgressPlugin((percentage, msg) => {
    if (!building && lastPercent !== 0) {
      console.log('')
    }

    const newPercent = Math.ceil(percentage * barOptions.width)
    if (lastPercent !== newPercent) {
      bar.update(percentage, { msg: msg })
      lastPercent = newPercent
    }

    if (!building) {
      building = true
      startTime = new Date()
      lastPercent = 0
    } else if (percentage === 1) {
      var now = new Date()
      var buildTime = (now - startTime) / 1000 + 's'

      console.log('')
      console.log(chalk.green.bold('  Build completed in ' + buildTime + '\n\n'))

      building = false
      startTime = 0
      lastPercent = 0
    }
  })
}
