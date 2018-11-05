const http = require('http')

const PORT = 4242

http.createServer(function (req, res) {
    console.log(`Server is running at port ${PORT}`)
    console.log('My request headers dump:')
    console.log(`host : ${req.headers.host}`)
    console.log(`user-agent : ${req.headers["user-agent"]}`)
    console.log(`accept : ${req.headers.accept}`)
    
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.write('done')
    res.end()
}).listen(PORT, () => {
    console.log('Server is running at port ' + PORT)
})
