const fs = require('fs')

module.exports = function (filename, content, callback) {
    fs.writeFile(filename, content, (err) => {
        if (err) throw err
    })
}