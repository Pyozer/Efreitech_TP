const { writeFile } = require('fs')

module.exports = (filename, content, callback) => {
    writeFile(filename, content, (err) => {
        if (err) throw err
        callback()
    })
}