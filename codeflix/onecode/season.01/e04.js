const fs = require('fs')

module.exports = function (filepath, callback) {
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) throw err
        callback(data)
    })
}