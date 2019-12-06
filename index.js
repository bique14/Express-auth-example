// const basicAuth = require('./lib/basic-auth')
// const tokenAuthRouter = require('./lib/token-auth')
// const allUserRouter = require('./lib/all-users')
// const findUser = require('./lib/find-user')
// const tokenRouter = require('./routes/tokens')
const fireAuth = require('./lib/fire-auth')
const cors = require('cors')

const express = require('express')
const app = express()


app.use(cors())
app.use(fireAuth)
// app.use('/tokens', tokenRouter)
// app.use(tokenAuthRouter)
// app.use(allUserRouter)
// app.use(basicAuth(findUser.byCredentials))

app.listen(3000)