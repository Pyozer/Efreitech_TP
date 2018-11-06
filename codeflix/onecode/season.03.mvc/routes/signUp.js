const Register = require('../controllers/register')
const fs = require('fs')

function signUpGet(req, res) {
    fs.readFile('./views/signUp.html', (err, data) => {
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

function signUpPost(req, res) {
    if (!req.postBody)
        sendData(res, 200, { 'success': false, 'message': 'Mising POST data' })

    Register.createAccount(req.postBody.username, req.postBody.password, req.postBody.password_confirm, (result) => {
        if (result == Register.RegisterState.missing_data)
            sendData(res, { 'success': false, 'message': 'Missing username or password in POST data' })
        else if (result == Register.RegisterState.error_file)
            sendData(res, { 'success': false, 'message': 'Accounts file is missing' })
        else if (result == Register.RegisterState.error_file_update)
            sendData(res, { 'success': false, 'message': 'Error during updating account file' })
        else if (result == Register.RegisterState.wrong_password_confirm)
            sendData(res, { 'success': false, 'message': 'Wrong password confirmation !' })
        else if (result == Register.RegisterState.account_exists)
            sendData(res, { 'success': true, 'message': 'Account with this username already exists' })
        else
            sendData(res, { 'success': false, 'message': 'Account successfully created' })
    })
}

function sendData(res, data) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(data))
    res.end()
}

module.exports = {
    signUpGet,
    signUpPost
}