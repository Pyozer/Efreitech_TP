const Constants = require('../constants')
const fs = require('fs')

var LoginState = { "unknown_account": 1, "wrong_password": 2, "login_success": 3, "missing_data": 4, "error_file": 5 }
Object.freeze(LoginState)

function checkCredentials(username, password, callback) {
    if (!username || !password)
        callback(LoginState.missing_data)
    else {
        fs.readFile(Constants.ACCOUNTS_FILE, (err, data) => {
            if (err)
                callback(LoginState.error_file)
            else {
                let json = JSON.parse(data)

                // Check username and password
                let accountExists = false
                for (let account of json) {
                    if (account.username.toLowerCase() == username.toLowerCase()) {
                        accountExists = true
                        if (account.password != password)
                            callback(LoginState.wrong_password)
                        else
                            callback(LoginState.login_success)
                        break
                    }
                }
                if (!accountExists)
                    callback(LoginState.unknown_account)
            }
        })
    }
}

module.exports = {
    LoginState,
    checkCredentials
}