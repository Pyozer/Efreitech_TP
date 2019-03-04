import { Router } from 'express'
import users from './users'

const api = Router()

api.use("/", users)

export default api
