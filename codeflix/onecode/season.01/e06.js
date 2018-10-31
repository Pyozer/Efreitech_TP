const fs = require('fs')

module.exports = function (filename) {
    fs.unlink(filename, (err) => {
        if (err) throw err
    })
}