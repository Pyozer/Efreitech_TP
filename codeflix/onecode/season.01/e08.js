const { access, constants } = require('fs')

module.exports = (path, callback) => {
    // Check if the file exists in the current directory, and if it is writable.
    access(path, constants.R_OK | constants.W_OK, err => {
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