const fs = require('fs')
const path = require('path');

function copyFolderSync(source, dest) {
    // check if folder needs to be created or not
    if (!fs.existsSync(dest))
        fs.mkdirSync(dest);

    if (fs.lstatSync(source).isDirectory()) {
        fs.readdirSync(source).forEach(file => {
            var curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory())
                copyFolderSync(curSource, path.join(dest, file))
            else
                fs.copyFileSync(curSource, path.join(dest, path.basename(curSource)))
        });
    }
}

module.exports = function (sourcepath, destpath) {
    copyFolderSync(sourcepath, destpath)
}