const express = require('express')
const router = express.Router()
const { db } = require('../data/database')
const User = require('../models/user')
const Link = require('../models/link')

// GET '/users'
router.get('/', (req, res) => {
  getUserList(users => res.json({ "status": "success", "users": users }))
})

function getUserList(callback) {
  db.all("SELECT id, nickname, email FROM user", (err, rows) => {
    if (err) throw err
    callback(rows || [])
  })
}

// POST '/users'
router.post('/', (req, res) => {
  const user = new User(null, req.body.nickname, req.body.password, req.body.email)

  if (!user.isValidForInsert()) {
    res.status(400).json({ "status": "error", "error": "Bad request", "message": "You need to pass 'nickname', 'password' and 'email' in post body" })
    return;
  }

  const stmt = db.prepare("INSERT INTO user(nickname, password, email) VALUES (?, ?, ?)");
  stmt.run(user.valuesWithoutId()); // all user data except id
  stmt.finalize();

  res.json({
    "status": "success",
    "message": "User has been successfully added !"
  })
})

// GET '/users/:userId'
router.get('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId)
  if (!userId) {
    res.status(400).json({ "status": "error", "error": "Bad request", "message": "You need to pass userId (int) in params, like: '/users/12'" })
    return;
  }

  getUser(userId, (user) => {
    if (!user) {
      res.status(404).json({
        "status": "error",
        "error": "Not found",
        "message": "User is not exists !"
      })
    } else {
      res.json({
        "status": "success",
        "user": user
      })
    }
  })
})

function getUser(user_id, callback) {
  db.get("SELECT * FROM user WHERE id = ?", [user_id], (err, row) => {
    if (err) throw err

    callback(row)
  })
}

// PATCH '/users/:userId'
router.patch('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId)
  if (!userId) {
    res.status(400).json({ "status": "error", "error": "Bad request", "message": "You need to pass userId (int) in params, like: '/users/12'" })
    return
  }

  const user = new User(userId, req.body.nickname, req.body.password, req.body.email)

  if (!user.nickname && !user.email && !user.password) {
    res.status(400).json({ "status": "error", "error": "Bad request", "message": "You need to pass at least new nickname, email or password in body" })
    return;
  }

  const reqParts = user.toMapWithoutId().map(data => `${data.key} = ?`)
  const reqUpdate = `UPDATE user SET ${reqParts.join(', ')} WHERE id = ?`

  const stmt = db.prepare(reqUpdate);
  stmt.run([...user.valuesWithoutId(), userId]);
  stmt.finalize();
  res.json({ "status": "success", "message": "User data has been successfully updated !" })
})

// DELETE '/users/:userId'
router.delete('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId)
  if (!userId) {
    res.status(400).json({ "status": "error", "error": "Bad request", "message": "You need to pass userId (int) in params, like: '/users/12'" })
    return
  }

  const stmt = db.prepare("DELETE FROM user WHERE id = ?");
  stmt.run(userId);
  stmt.finalize();
  res.json({ "status": "success", "message": "User has been successfully deleted !" })
})

// GET '/users/:userId/links'
router.get('/:userId/links', (req, res) => {
  const userId = parseInt(req.params.userId)
  if (!userId) {
    res.status(400).json({ "status": "error", "error": "Bad request", "message": "You need to pass userId (int) in params, like: '/users/12/links'" })
    return
  }

  getUser(userId, (user) => {
    if (!user) {
      res.status(404).json({
        "status": "error",
        "error": "Not found",
        "message": "User is not exists !"
      })
    } else {
      db.all(`
        SELECT link.id as id_link, link.tags, link.url, user.id as id_user, user.nickname, user.email FROM link
        INNER JOIN user ON user.id = link.user_id
        WHERE link.user_id = ?
      `, [userId], (err, rows) => {
          if (err) throw err

          let jsonFormatted = []
          for (const row of rows) {
            jsonFormatted.push(
              new Link(
                row.id_link,
                row.tags,
                row.url,
                new User(row.id_user, row.nickname, row.email)
              )
            )
          }

          res.json({
            "status": "success",
            "links": jsonFormatted
          })
        })
    }
  })
})

// POST '/users/:userId/links'
router.post('/:userId/links', (req, res) => {
  const userId = parseInt(req.params.userId)
  if (!userId) {
    res.status(400).json({ "status": "error", "error": "Bad request", "message": "You need to pass userId (int) in params, like: '/users/12/links'" })
    return
  }

  getUser(userId, (user) => {
    if (!user) {
      res.status(404).json({
        "status": "error",
        "error": "Not found",
        "message": "User is not exists !"
      })
    } else {
      const link = new Link(null, req.body.tags, req.body.url, null)

      if (!link.tags && !link.url) {
        console.log(link)
        res.status(400).json({ "status": "error", "error": "Bad request", "message": "You must pass 'tags' and 'url' in body" })
        return;
      }

      const stmt = db.prepare("INSERT INTO link(tags, url, user_id) VALUES (?, ?, ?)");
      stmt.run(link.tags, link.url, userId);
      stmt.finalize();

      res.json({
        "status": "success",
        "message": "Link has been successfully added !"
      })
    }
  })
})

module.exports = router
