const users = require('../fixtures/users')
const jwt = require('jsonwebtoken')

const signature = '1m_s3cure'


const findUserByToken = ({ userId }) =>
  users.find(user => user.id === userId)


const tokenAuth = (req, res, next) => {
  const header = req.headers.authorization || ''
  const [type, token] = header.split(' ')


  if (type == 'Bearer') {
    const payload = jwt.verify(token, signature)
    const user = findUserByToken(payload)

    if (user) {
      req.user = user
      res.send(user)
    } else {
      res.send(`Invalid token`)
      return;
    }
  } else {
    res.sendStatus(401)
  }
}

module.exports = tokenAuth