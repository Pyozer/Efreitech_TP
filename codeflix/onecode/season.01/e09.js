const { chmod } = require('fs')

module.exports = (filepath, mode, callback) => {
    chmod(filepath, parseInt(mode, 8), err => {
        if (err) throw err
        callback()
    })
}