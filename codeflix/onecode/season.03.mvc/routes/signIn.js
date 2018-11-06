const Login = require('../controllers/login')
const fs = require('fs')

function signInGet(req, res) {
    fs.readFile('./views/signIn.html', (err, data) => {
        if (err) {
            res.writeHead(500)
            res.write(err.message)
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(data)
        }
        res.end()
    })
}

function signInPost(req, res) {
    if (!req.postBody)
        sendData(res, 200, { 'success': false, 'message': 'Mising POST data' })

    Login.checkCredentials(req.postBody.username, req.postBody.password, (result) => {
        if (result == Login.LoginState.missing_data)
            sendData(res, { 'success': false, 'message': 'Missing username or password in POST data' })
        else if (result == Login.LoginState.error_file)
            sendData(res, { 'success': false, 'message': 'Accounts file is missing' })
        else if (result == Login.LoginState.wrong_password)
            sendData(res, { 'success': false, 'message': 'Wrong password!' })
        else if (result == Login.LoginState.login_success)
            sendData(res, { 'success': true, 'message': 'Login successfull !' })
        else
            sendData(res, { 'success': false, 'message': 'No account match with this username' })
    })
}

function sendData(res, data) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(data))
    res.end()
}

module.exports = {
    signInGet,
    signInPost
}