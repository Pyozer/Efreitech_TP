const Constants = require('../constants')
const fs = require('fs')

var RegisterState = { "account_exists": 1, "wrong_password_confirm": 2, "register_success": 3, "missing_data": 4, "error_file": 5, "error_file_update": 6 }
Object.freeze(RegisterState)

function createAccount(username, password, password_confirm, callback) {
    if (!username || !password || !password_confirm)
        callback(RegisterState.missing_data)
    else if (password != password_confirm)
        callback(RegisterState.wrong_password_confirm)
    else {
        fs.readFile(Constants.ACCOUNTS_FILE, (err, data) => {
            if (err)
                callback(RegisterState.error_file)
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
                    callback(RegisterState.account_exists)
                else {
                    json.push({
                        username: body.username,
                        password: body.password
                    })
                    fs.writeFile(ACCOUNTS_FILE, JSON.stringify(json), (err, data) => {
                        if (err)
                            callback(RegisterState.error_file_update)
                        else
                            callback(RegisterState.register_success)
                    })
                }
            }
        })
    }
}

module.exports = {
    RegisterState,
    createAccount
}