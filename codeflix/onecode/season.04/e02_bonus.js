const http = require('http')
const fs = require('fs')

if (!process.argv[2])
    throw "You need to provide server PORT in argument"

const PORT = process.argv[2]

// Init messages at server start (avoid to read file at every request)
let data = {}
try {
    data = JSON.parse(fs.readFileSync('./messages.json'))
} catch (e) {
    throw e
}

const htmlPage = fs.readFileSync('./e02_bonus.html').toString()

http.createServer(function (req, res) {
    const reqUrl = req.url.replace(/\/\/+/g, "/");
    if (reqUrl == '/' && req.method == 'GET') { // Display html page
        sendResponse(res, 200, 'text/html', htmlPage)
    } else if (reqUrl == '/messages' && req.method == 'GET') { // Send messages in JSON
        sendResponse(res, 200, 'application/json', JSON.stringify(data))
    } else if (reqUrl == '/messages' && req.method == 'POST') { // Add new message
        collectRequestData(req, (body) => {
            if (!body || body.trim().length == 0) {
                sendResponse(res, 400, 'text/plain', 'You need to provide your message in POST body !')
            } else {
                data.messages.unshift({
                    text: body.trim(),
                    date: new Date().toISOString()
                })
                // Update json file
                const dataStr = JSON.stringify(data)
                fs.writeFile('./messages.json', dataStr, (err, data) => {
                    if (err) throw err
                })
                // Send all messages (with the new message)
                sendResponse(res, 200, 'application/json', JSON.stringify(data))
            }
        })
    } else {
        sendResponse(res, 404, 'text/plain', '404 Not Found')
    }
}).listen(PORT)

function sendResponse(res, status, contentType, data) {
    res.writeHead(status, { 'Content-Type': contentType })
    res.write(data)
    res.end()
}

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if (request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(body);
        });
    }
    else {
        callback(null);
    }
}