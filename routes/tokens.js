const findUser = require('../lib/find-user')

const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')


const signature = '1m_s3cure'


const createToken = (user) =>
  jwt.sign(
    { userId: user.username },
    signature,
    { expiresIn: '7d' }
  )


const createTokenRoute = (req, res, next) => {
  const credentials = req.body
  const user = findUser.byCredentials(credentials)
  console.log('[tokens] user', user)

  if (user) {
    const token = createToken(user)
    // res.token = token
    console.log('[tokens]', token)
    res.status(201)
    res.send(token)
    next()
  } else {
    res.sendStatus(422)
  }
}

const tokenRouters = express.Router()

tokenRouters.post('/', bodyParser.json(), createTokenRoute)

module.exports = tokenRouters