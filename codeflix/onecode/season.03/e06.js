const http = require('http')
const url = require('url')
const fs = require('fs')

const PORT = 4242

http.createServer(function (req, res) {
    const query = url.parse(req.url, true).query

    if (!query.mime)
        sendData(res, 'text/plain', "I woke up, I found the server without query parameters,  that's all I known.")
    else if(query.mime == "txt")
        sendFileData(res, './resources/mike.txt', 'text/plain')
    else if (query.mime == "mp3")
        sendFileData(res, './resources/bb.mp3', 'audio/mpeg')
    else if (query.mime == "gif")
        sendFileData(res, './resources/ch0pper.gif', 'image/gif')
    else if (query.mime == "png")
        sendFileData(res, './resources/cb.png', 'image/png')

}).listen(PORT, () => {
    console.log('Server is running at port ' + PORT)
})

function sendFileData(res, file, contentType) {
    fs.readFile(file, (err, data) => {
        if (err) throw err
        sendData(res, contentType, data)
    })
}

function sendData(res, contentType, data) {
    res.writeHead(200, { 'Content-Type': contentType })
    res.write(data)
    res.end()
}