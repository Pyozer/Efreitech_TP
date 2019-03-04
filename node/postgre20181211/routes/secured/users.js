import { Router } from "express"
import User from "../../models/user"

const api = Router()

api.get("/", async (req, res) => {
  const users = await User.findAll()

  res.status(200).json({
    data: { users }
  })
})

api.get("/:userId", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { uuid: req.params.userId }
    })

    res.status(200).json({
      data: { user }
    })
  } catch (e) {
    res.status(400).json({
      error: { message: e.message }
    })
  }
})

api.put("/:userId", async (req, res) => {
  try {
    const { nickname, email, password, password_confirmation } = req.body

    if (password && !password_confirmation || !password && password_confirmation)
      throw new Error("You must provide password and password confirmation if you want to change password !")

    const user = await User.findOne({
      where: { uuid: req.params.userId }
    })

    const userUpdated = await user.update(
      JSON.parse(JSON.stringify({ nickname, email, password, password_confirmation })),
      { returning: true, where: { uuid: req.params.userId } }
    )

    res.status(200).json({
      data: { user: userUpdated }
    })
  } catch (e) {
    res.status(400).json({
      error: { message: e.message }
    })
  }
})

export default api
