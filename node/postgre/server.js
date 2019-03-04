import express from "express"
import bodyParser from "body-parser"
import api from "./routes"
import { db as database } from './models'
import passport from 'passport'
import './middlewares/passport'

const start = async () => {
  try {
    const port = parseInt(process.argv[2] || process.env.PORT)
    const app = express()

    await database.authenticate()
    await database.sync({force: true})

    app.use(passport.initialize())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.get("/", (req, res) => {
      res.send("Please feel free to use our api with /api")
    })

    app.use("/api", api)

    app.listen(port, () => {
      console.log(`Server is running in localhost at ${port}`)
    })
  } catch (e) {
    console.log(e.message);

  }
}

// Let's Rock! :)
start()