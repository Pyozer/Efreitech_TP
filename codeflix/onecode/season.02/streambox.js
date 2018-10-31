const fs = require('fs')
const path = require('path')
const stream = require('stream');

// Function to get filename (w/out extension), extension and filename
function getFileInfo(file) {
    const fileExt = path.extname(file)
    const filename = path.basename(file, fileExt)
    return { filename: filename, fileExt: fileExt, file: `${filename}${fileExt}` }
}

function duplicate(filename, callback) {
    const fInfo = getFileInfo(filename)

    const readable = fs.createReadStream(filename);
    const writable = fs.createWriteStream(`./${fInfo.filename}.copy${fInfo.fileExt}`);

    writable.on('finish', () => {
        callback(fInfo.file)
    });
    readable.pipe(writable);
}

function transform(filename, re, fn, in_stdout = true) {
    const fInfo = getFileInfo(filename)

    const readable = fs.createReadStream(filename);
    const writable = fs.createWriteStream(`./${fInfo.filename}.transform${fInfo.fileExt}`);

    const streamTransform = new stream.Transform();

    streamTransform._transform = function (data, enc, cb) {
        var transformed = data.toString().replace(re, fn);
        cb(null, transformed);
        console.log(`File: ${fInfo.file} successfully transformed!`)
    };

    let readPipe = readable.pipe(streamTransform)
    if (!in_stdout)
        readPipe.pipe(writable)
    else
        readPipe.pipe(process.stdout)
}

function csv2json(filename) {
    const fInfo = getFileInfo(filename)

    const readable = fs.createReadStream(filename);
    const writable = fs.createWriteStream(`./${fInfo.filename}.json`);
    const streamTransform = new stream.Transform();

    streamTransform._transform = function (data, enc, cb) {
        const json = []
        let header = []
        let lineNumber = 0
        // For each line of csv file
        data.toString().split('\n').forEach(line => {
            const values = line.split(';') // Get values

            if (lineNumber == 0) { // If first line, get header values
                header = values
            } else {
                let obj = {}
                // Get value for each header
                for (let i = 0; i < header.length; i++) {
                    const value = values[i]

                    if (value.match(/[0-9]{8}/)) { // If it's a date (ex: 20181030)
                        const year = value.substring(0, 4)
                        const month = value.substring(4, 6)
                        const day = value.substring(6, 8)
                        obj[header[i]] = `${year}-${month}-${day}`
                    } else if (value.indexOf(',') !== -1) { // If multiple value (ex: composer,pianist)
                        obj[header[i]] = value.toLowerCase().split(',').map(item => item.trim())
                    } else {
                        obj[header[i]] = value
                    }
                }
                json.push(obj) // Add to json
            }
            lineNumber++
        })
        cb(null, JSON.stringify(json, null, 2));
    };

    writable.on('finish', () => {
        console.log(`File: ${fInfo.filename}.json successfully created!`)
    })

    readable.pipe(streamTransform).pipe(writable)
}

function WTFIsThisPipe(directory, type) {
    fs.readdir(directory, function (err, files) {
        if (err) throw err

        filesList = files.filter(e => path.extname(e).toLowerCase() === `.${type}`);
        const listFunctions = []
        filesList.forEach(file => {
            const fileContent = fs.readFileSync(path.join(directory, file), 'utf8')
            fileContent.split('\n').forEach(line => {
                var fnRegex = /function (([a-zA-Z0-9\s_])+\((.*)\))\s?\{/g;
                var match = fnRegex.exec(line);
                if (match && match.length > 0)
                    listFunctions.push(match[1])
            })
        })
        listFunctions.forEach(fct => {
            console.log('I will finish: ' + fct)
        })
    });
}

function catPipeWc(directory, type, cb) {
    fs.readdir(directory, function (err, files) {
        if (err) throw err

        // Get only file with specific extension
        filesList = files.filter(e => path.extname(e).toLowerCase() === `.${type}`);

        let bytesCounter = 0

        const readable = new stream.Readable({
            objectMode: true,
            read() { }
        })
        const counter = new stream.Transform({
            objectMode: true,
            transform: (byteLength, _, done) => {
                bytesCounter += byteLength
                done(null, byteLength)
            }
        })
        // When finish files reading
        readable.on('close', () => {
            cb(bytesCounter)
        })
        readable.pipe(counter)

        let nbFileRead = 0
        filesList.forEach(file => {
            fs.readFile(path.join(directory, file), (err, data) => {
                if (err) {
                    readable.destroy()
                    throw err
                }
                readable.push(data.byteLength)

                nbFileRead++
                if (nbFileRead == filesList.length) {
                    readable.destroy()
                }
            })
        })
    });
}

module.exports = {
    duplicate,
    transform,
    csv2json,
    WTFIsThisPipe,
    catPipeWc
}