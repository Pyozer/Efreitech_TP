const currentDir = require('./e01')
const getFileExt = require('./e02')
const getFileContentSync = require('./e03')
const getFileContent = require('./e04')
const createFile = require('./e05')
const removeFile = require('./e06')
const getPathType = require('./e07')
const getPathRights = require('./e08')
const chmodChange = require('./e09')
const copyFolder = require('./e10')

const args = process.argv

/*
// EPISODE 1
console.log(currentDir())

// EPISODE 2
if (args.length == 3)
    console.log(getFileExt(args[2]))

// EPISODE 3
if (args.length == 3)
    console.log(getFileContentSync(args[2]))

// EPISODE 4
if (args.length == 3)
    getFileContent(args[2], function (data) {
        console.log(data)
    })

// EPISODE 5
if (args.length == 4)
    createFile(args[2], args[3])

// EPISODE 6
if (args.length == 3)
    removeFile(args[2])

// EPISODE 7
if (args.length == 3)
    getPathType(args[2], function(path, type) {
        console.log(`The argument [ ${path} ] is a ${type}`)
    })

// EPISODE 8
if (args.length == 3)
    getPathRights(args[2], function (path, readable, writable) {
        if (!readable && !writable)
            console.log(`I don't have access to the file ${path}`)
        if (readable && !writable)
            console.log(`I only have read access to the file ${path}`)
        if (readable && writable)
            console.log(`I have read and write access to the file ${path}`)
    })


// EPISODE 9
if (args.length == 4)
    chmodChange(args[2], args[3], function () {
        console.log('Permissions has been changed!')
    })
*/

// EPISODE 10
if (args.length == 4) {
    copyFolder(args[2], args[3])
    console.log(`Directory [ ${args[2]} ] successfully duplicated into [ ${args[3]} ]`)
}