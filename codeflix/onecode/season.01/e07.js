const { lstat } = require('fs')

module.exports = (path, callback) => {
    lstat(path, (err, stats) => {
        if (err) throw err

        let type;
        if (stats.isFile()) type = "file"
        else if (stats.isDirectory()) type = "directory"
        else if (stats.isSymbolicLink()) type = "symbolic link"
        else if (stats.isFIFO()) type = "FIFO"
        else if (stats.isSocket()) type = "socket"
        else if (stats.isCharacterDevice()) type = "UNIX things"
        else if (stats.isBlockDevice()) type = "block device"

        callback(path, type)
    });
}