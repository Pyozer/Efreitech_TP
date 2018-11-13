const { Router } = require('express')
const loginRouter = Router()
const registerRouter = Router()

const { db } = require('../data/database')
const { sendUserNotExists } = require('./users')

const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user')

// POST '/users'
registerRouter.post('/', (req, res) => {
    const user = new User(null, req.body.email, req.body.password, req.body.nickname)

    if (!user.isValid()) {
        res.status(400).json({ "status": "error", "error": "Bad request", "message": "You need to pass 'nickname', 'password' and 'email' in post body" })
        return;
    }

    db.get('SELECT email, nickname FROM user WHERE email = ? OR nickname = ?', [user.email, user.nickname], (err, userRow) => {
        if (err) throw err

        if (userRow) {
            if (user.email == userRow.email)
                res.json({ "status": "error", "error": "User exists request", "message": "This email is already taken by another user !" })
            else
                res.json({ "status": "error", "error": "User exists request", "message": "This nickname is already taken by another user !" })
        } else {
            bcrypt.hash(user.password, saltRounds, (err, hash) => {
                user.password = hash

                db.run(
                    "INSERT INTO user(nickname, password, email) VALUES ($nickname, $password, $email)",
                    user.toJSONDB(),
                    err => {
                        if (err) throw err
                        res.json({ "status": "success", "message": "User has been successfully added !" })
                    }
                )
            })
        }
    })
})

loginRouter.post('/', (req, res) => {
    const user = new User(null, req.body.email, req.body.password, req.body.nickname)

    if ((!user.email && !user.nickname) || !user.password) {
        res.status(400).json({ "status": "error", "error": "Bad request", "message": "You need to pass 'email' or 'nickname' and 'password' in post body" })
        return;
    }

    db.get('SELECT * FROM user WHERE email = ? OR nickname = ?', [user.email, user.nickname], (err, userRow) => {
        if (err) throw err

        if (!user) {
            sendUserNotExists(res)
        } else {
            const isPwdMatch = bcrypt.compareSync(user.password, userRow.password)
            if (!isPwdMatch) {
                res.status(401).json({ "status": "error", "error": "Credential fail", "message": "Email/Nickname or password are incorrect !" })
                return;
            }

            res.json({ "status": "success", "message": "Login successfull" })
        }
    })
})

module.exports = {
    registerRouter,
    loginRouter
}
