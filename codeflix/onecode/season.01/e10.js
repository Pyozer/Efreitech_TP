const fs = require('fs')
const { join, basename } = require('path');

function copyFolderSync(source, dest) {
    // check if folder needs to be created or not
    if (!fs.existsSync(dest))
        fs.mkdirSync(dest);

    if (fs.lstatSync(source).isDirectory()) {
        fs.readdirSync(source).forEach(file => {
            var curSource = join(source, file);
            if (fs.lstatSync(curSource).isDirectory())
                copyFolderSync(curSource, join(dest, file))
            else
                fs.copyFileSync(curSource, join(dest, basename(curSource)))
        });
    }
}

module.exports = (sourcepath, destpath) => {
    copyFolderSync(sourcepath, destpath)
}