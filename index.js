const basicAuth = require('./lib/basic-auth')
const tokenAuth = require('./lib/token-auth')
const findUser = require('./lib/find-user')
const tokenRouter = require('./routes/tokens')

const express = require('express')
const app = express()


app.use('/tokens', tokenRouter)
app.use(tokenAuth)
app.use(basicAuth(findUser.byCredentials))

app.listen(3000)

