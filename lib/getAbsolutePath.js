const execa = require('execa')

module.exports = function getAbsolutePath () {
  return execa.shellSync('pwd').stdout
}
