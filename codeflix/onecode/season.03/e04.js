const http = require('http')
const url = require('url')

const PORT = 4242

http.createServer(function (req, res) {
    console.log("My request dump:")
    console.log(`${req.method} ${req.url}`)
    
    const query = url.parse(req.url).query
    if (query) {
        const params = url.parse(req.url).query.split("&")
        
        console.log(`There are ${params.length} query parameters`)
        for (const param of params) {
            const paramInfo = param.split('=')
            console.log(`${paramInfo[0]}: ${paramInfo[1]}`)
        }
    }
    
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.write('done')
    res.end()
}).listen(PORT, () => {
    console.log('Server is running at port ' + PORT)
})
