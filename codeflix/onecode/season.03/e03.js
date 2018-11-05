const http = require('http')
const fs = require('fs')

const args = process.argv

let port = 4242
if (args.length >= 3)
    port = args[2]

http.createServer(function (req, res) {
    let filePath
    if (req.url == "/" || req.url == "/index" || req.url == "/index.html")
        filePath = './resources/index.html'
    else
        filePath = '.' + req.url

    fs.readFile(filePath, (err, data) => {
        if (err)
            sendResponse(res, 500, err.message)
        else
            sendResponse(res, 200, data)
    })
}).listen(port, () => {
    console.log('Server is running at port ' + port)
})

function sendResponse(res, status, data) {
    res.writeHead(status)
    res.write(data)
    res.end()
}