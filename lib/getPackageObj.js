var path = require('path')

module.exports = function getPackageObj (localPath) {
  const packagePath = path.join(localPath, 'package.json')
  const packageObj = require(packagePath)
  return packageObj
}
