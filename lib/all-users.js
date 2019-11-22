const users = require('../fixtures/users')

const bodyParser = require('body-parser')
const express = require('express')
const jwt = require('jsonwebtoken')

const signature = '1m_s3cure'

const allUserRouter = express.Router()


const findUserByToken = ({ userId }) =>
  users.find(user => user.id === userId)


allUserRouter.get('/users', bodyParser.json(), (req, res, next) => {
  const header = req.headers.authorization || ''
  const [type, token] = header.split(' ')

  if (type == 'Bearer') {
    let payload
    try {
      payload = jwt.verify(token, signature)
      const user = findUserByToken(payload)

      if (user) {
        req.user = user
        res.send(users)
      } else {
        res.send(`invalid signature`)
        return;
      }
    } catch(err) {
      res.send(err.message)
    }
  } else {
    res.sendStatus(401)
  }
})


module.exports = allUserRouter