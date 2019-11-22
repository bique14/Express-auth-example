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


const createTokenRoute = (req, res) => {
  const credentials = req.body
  const user = findUser.byCredentials(credentials)
  console.log('user', user)

  if (user) {
    const token = createToken(user)
    console.log('token', token)
    res.status(200)
    res.send(`I am user ${user.username}\n${token}`)
  } else {
    res.sendStatus(401)
  }
}

const tokenRouters = express.Router()

tokenRouters.post('/', bodyParser.json(), createTokenRoute)

module.exports = tokenRouters