const { readFile } = require('fs')

module.exports = (filepath, callback) => {
    readFile(filepath, 'utf8', (err, data) => {
        if (err) throw err
        callback(data)
    })
}