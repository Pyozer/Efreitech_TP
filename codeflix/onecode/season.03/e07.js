const http = require('http')
const { parse } = require('querystring')
const fs = require('fs')

const PORT = 4242
const ACCOUNTS_FILE = './data/account.json'
const ROUTE_SIGN_IN = '/signIn'
const ROUTE_SIGN_UP = '/signUp'

http.createServer(function (req, res) {
    if (req.url == ROUTE_SIGN_IN && req.method == "GET") {
        sendFileData(res, './pages/signIn.html', 'text/html')
    } else if (req.url == ROUTE_SIGN_IN && req.method == "POST") {
        signInPostRoute(req, res)
    } else if (req.url == ROUTE_SIGN_UP && req.method == "GET") {
        sendFileData(res, './pages/signUp.html', 'text/html')
    } else if (req.url == ROUTE_SIGN_UP && req.method == "POST") {
        signUpPostRoute(req, res)
    } else if (req.url.startsWith('/assets/') && req.method == "GET") { // Handle assets file (js, css)
        sendFileData(res, '.' + req.url, '')
    } else if (req.url == '/') { // redirect to signIn page if try to access to /
        res.writeHead(302, { 'Location': '/signIn.html' })
        res.end()
    } else {
        sendFileData(res, './pages/404.html', 'text/html', 404)
    }
}).listen(PORT, () => {
    console.log('Server is running at port ' + PORT)
})


// Handle signIn post route
function signInPostRoute(req, res) {
    collectRequestData(req, (body) => {
        if (!body)
            sendData(res, 200, { 'success': false, 'message': 'Mising POST data' })
        else if (!body.username || !body.password)
            sendData(res, 200, { 'success': false, 'message': 'Missing username or password in POST data' })
        else {
            fs.readFile(ACCOUNTS_FILE, (err, data) => {
                if (err)
                    sendData(res, 200, { 'success': false, 'message': 'Accounts file is missing' })
                else {
                    let json = JSON.parse(data)

                    // Check username and password
                    let accountExists = false
                    for (let account of json) {
                        if (account.username.toLowerCase() == body.username.toLowerCase()) {
                            accountExists = true
                            if (account.password != body.password)
                                sendData(res, 200, { 'success': false, 'message': 'Wrong password!' })
                            else
                                sendData(res, 200, { 'success': true, 'message': 'Login successfull !' })
                            break
                        }
                    }
                    if (!accountExists)
                        sendData(res, 200, { 'success': false, 'message': 'No account match with this username' })
                }
            })
        }
    })
}

// Handle signUp post route
function signUpPostRoute(req, res) {
    collectRequestData(req, (body) => {
        if (!body)
            sendData(res, 200, { 'success': false, 'message': 'Mising POST data' })
        else if (!body.username || !body.password || !body.password_confirm)
            sendData(res, 200, { 'success': false, 'message': 'Missing username or password or password confirmation in POST data !' })
        else if (body.password != body.password_confirm)
            sendData(res, 200, { 'success': false, 'message': 'Password and password confirmation are not equals !' })
        else {
            fs.readFile(ACCOUNTS_FILE, (err, data) => {
                if (err)
                    sendData(res, 200, { 'success': false, 'message': 'Accounts file is missing' })
                else {
                    let json = JSON.parse(data)

                    // Check if account is not already exists
                    let accountExists = false
                    for (let account of json) {
                        if (account.username.toLowerCase() == body.username.toLowerCase()) {
                            accountExists = true
                            break
                        }
                    }

                    if (accountExists)
                        sendData(res, 200, { 'success': false, 'message': 'Account with this username already exists !' })
                    else {
                        json.push({
                            username: body.username,
                            password: body.password
                        })
                        fs.writeFile(ACCOUNTS_FILE, JSON.stringify(json), (err, data) => {
                            if (err)
                                sendData(res, 200, { 'success': false, 'message': 'Error during updating accounts file !' })
                            else
                                sendData(res, 200, { 'success': true, 'message': 'Successfully registered account.' })
                        })
                    }
                }
            })
        }
    })
}

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