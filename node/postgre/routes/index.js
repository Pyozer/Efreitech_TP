import { Router } from 'express'
import secured from './secured/'
import auth from './auth'
import passport from 'passport'
import "../middlewares/passport";

const api = Router()

api.get("/", (req, res) => {
  res.json({
    name: "sanji.Api",
    meta: {
      version: "1.0.0",
      status: "running"
    }
  });
});

api.use("/users", passport.authenticate('jwt', { session: false }), secured)
api.use("/auth", auth)

export default api
