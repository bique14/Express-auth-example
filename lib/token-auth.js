const users = require('../fixtures/users')

const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const express = require('express')

const signature = '1m_s3cure'


const findUserByToken = ({ userId }) =>
  users.find(user => user.id === userId)


const tokenAuth = (req, res, next) => {
  const header = req.headers.authorization || ''
  const [type, token] = header.split(' ')

  if (type == 'Bearer') {
    let payload
    try {
      payload = jwt.verify(token, signature)
      const user = findUserByToken(payload)

      if (user) {
        req.user = user
        res.send(user)
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
}
const tokenAuthRouter = express.Router()

tokenAuthRouter.get('/me', bodyParser.json(), tokenAuth)

module.exports = tokenAuthRouter