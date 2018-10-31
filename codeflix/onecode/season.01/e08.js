const fs = require('fs')

module.exports = function (path, callback) {
    // Check if the file exists in the current directory, and if it is writable.
    fs.access(path, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (err && err.code === 'ENOENT')
            throw err // File not exists
        else if (err && err.code === 'EPERM')
            callback(path, false, false) // Not allowed
        else if (err)
            callback(path, true, false) // Only read
        else
            callback(path, true, true) // Read and write
    });
}