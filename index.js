const tokenRouter = require('./routes/tokens')
const basicAuth = require('./lib/basic-auth')
const findUser = require('./lib/find-user')

const express = require('express')
const app = express()

// app.use(basicAuth)
app.use('/tokens', tokenRouter)
app.use(basicAuth(findUser.byCredentials))

// const express = require('express')
// const app = express()

// app.get('/', (req, res) => {
//   res.send('hello world')
// })

app.listen(3000)

