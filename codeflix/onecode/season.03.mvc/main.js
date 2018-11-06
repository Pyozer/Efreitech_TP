const http = require('http')
const { parse } = require('querystring')
const fs = require('fs')
const LoginRoute = require('./routes/signIn')
const RegisterRoute = require('./routes/signUp')

const PORT = 4242
const ROUTE_SIGN_IN = '/signIn'
const ROUTE_SIGN_UP = '/signUp'

http.createServer(function (req, res) {
    collectRequestData(req, (body) => {
        req.postBody = body

        if (req.url == ROUTE_SIGN_IN && req.method == "GET") {
            LoginRoute.signInGet(req, res)
        } else if (req.url == ROUTE_SIGN_IN && req.method == "POST") {
            LoginRoute.signInPost(req, res)
        } else if (req.url == ROUTE_SIGN_UP && req.method == "GET") {
            RegisterRoute.signUpGet(req, res)
        } else if (req.url == ROUTE_SIGN_UP && req.method == "POST") {
            RegisterRoute.signUpPost(req, res)
        } else if (req.url.startsWith('/assets/') && req.method == "GET") { // Handle assets file (js, css)
            sendFileData(res, '.' + req.url, '')
        } else if (req.url == '/') { // redirect to signIn page if try to access to /
            res.writeHead(302, { 'Location': '/signIn.html' })
            res.end()
        } else {
            sendFileData(res, './pages/404.html', 'text/html', 404)
        }
    })

}).listen(PORT, () => {
    console.log('Server is running at port ' + PORT)
})


// Send file content
function sendFileData(res, file, contentType, status = 200) {
    fs.readFile(file, (err, data) => {
        if (err)
            sendData(res, 500, err.message, 'text/plain')
        else
            sendData(res, status, data, contentType)
    })
}

// Send response
function sendData(res, status, data, contentType = 'application/json') {
    res.writeHead(status, { 'Content-Type': contentType })
    if (contentType == 'application/json' && typeof data !== 'string')
        res.write(JSON.stringify(data))
    else
        res.write(data)
    res.end()
}

// Retrieve POST body
function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded'
    if (request.headers['content-type'] === FORM_URLENCODED) {
        let body = ''
        request.on('data', chunk => {
            body += chunk.toString()
        })
        request.on('end', () => {
            callback(parse(body))
        })
    }
    else {
        callback(null)
    }
}