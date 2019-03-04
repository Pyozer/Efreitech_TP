import { Router } from "express"
import jwt from "jsonwebtoken"
import passport from "passport"
import User from "../models/user";
const api = Router()

api.post("/register", async (req, res) => {
    try {
        const { nickname, email, password, password_confirmation } = req.body

        const user = new User({
            nickname, email, password, password_confirmation
        })
        await user.save()

        const payload = { uuid: user.uuid, nickname, email }
        const token = jwt.sign(payload, process.env.JWT_ENCRYPTION)

        res.status(200).json({
            status: "success",
            code: 200,
            data: user,
            meta: { token }
        })
    } catch (e) {
        res.status(500).json({
            status: "error",
            code: 500,
            message: e.message
        })
    }
})

api.post("/login", async (req, res) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err) {
            return res.status(400).json({
                status: "error",
                code: 400,
                message: err
            });
        }
        
        const { uuid, nickname, email,  } = user
        const payload = { uuid: uuid, nickname, email }
        const token = jwt.sign(payload, process.env.JWT_ENCRYPTION)

        res.status(200).json({
            status: "success",
            code: 200,
            data: user,
            meta: { token }
        })
    })(req, res);
})

export default api