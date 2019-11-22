// const bcrypt = require('bcrypt')
// const users = require('../fixtures/users')

// const findUserByCredentials = ({ username, password }) =>
//   users.find(user => user.username === username && user.password === password)


// const SALT_ROUNDS = 10

// async function hashPassword() {
//   let hashed = await bcrypt.hash('alps', SALT_ROUNDS);
//   if (await bcrypt.compare('alps', hashed)) {
//     console.log('Username is correct!');
//   } else {
//     console.log('Invalid username');
//   }
// }


let basicAuth = (findUserByCredentials) => (req, res, next) => {
  let header = req.headers.authorization || ''
  let [type, payload] = header.split(' ')

  if (type == 'Basic') {
    const credentials = Buffer.from(payload, 'base64').toString('ascii')
    const [username, password] = credentials.split(':')

    const user = findUserByCredentials({ username, password })
    console.log(user)
    if (user) {
      // hashPassword()
      res.send(user)
      next()
    } else {
      res.send('Invalid username')
    }
  }
  else {
    res.sendStatus(401)
  }
}

module.exports = basicAuth