const fs = require('fs')

module.exports = function(filepath, chmod, callback) {
    fs.chmod(filepath, chmod,  function(err) {
        if (err) throw err
        callback()
    })
}