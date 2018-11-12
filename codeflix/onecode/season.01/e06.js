const { unlink } = require('fs')

module.exports = (filename, callback) => {
    unlink(filename, err => {
        if (err) throw err
        callback()
    })
}