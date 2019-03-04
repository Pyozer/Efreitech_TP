import { Router } from "express"
import User from "../../models/user";

const api = Router()

api.get("/", async (req, res) => {
  const users = await User.findAll()

  res.status(200).json({
    status: "success",
    code: 200,
    data: users
  })
})

export default api
