const express = require('express')
const bodyParser = require('body-parser')
const findUser = require('../lib/find-user')

const createTokenRoute = (req, res) => {
  const credentials = req.body
  const user = findUser.byCredentials(credentials)
  console.log('user', user)

  if (user) {
    res.status(200)
    res.send(`I am user ${user.username}`)
  } else {
    res.sendStatus(401)
  }
}

const tokenRouters = express.Router()

tokenRouters.post('/', bodyParser.json(), createTokenRoute)

module.exports = tokenRouters