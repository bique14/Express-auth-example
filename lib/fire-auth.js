var admin = require("firebase-admin");
var serviceAccount = require("../secret.json");

const bodyParser = require('body-parser')
const express = require('express')
const fireAuth = express.Router()


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://elm-auth-352f2.firebaseio.com"
});


fireAuth.get('/fire', bodyParser.json(), (req, res, next) => {
  const header = req.headers.authorization || ''
  const [type, token] = header.split(' ')
  console.log(token)
  admin.auth().verifyIdToken(token)
    .then(function (decodedToken) {
      let uid = decodedToken.uid;
      console.log(decodedToken)
      console.log(uid)
      res.send(decodedToken)
    }).catch(function (error) {
      console.log(`Error ${error}`)
      res.send(error.message)
    });
})


module.exports = fireAuth