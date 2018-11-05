const http = require('http')

const args = process.argv

if (args.length < 3) {
    console.error("usage: node e01.js <PORT>")
    return
}

const PORT = args[2]

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('<h1>Hello World!</h1>')
    res.end()
}).listen(PORT, () => {
    console.log('Server is running at port ' + PORT)
})