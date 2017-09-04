var express = require('express')
var app = express()
var basicAuth = require('express-basic-auth')

var port = process.env.PORT || 5000

function isHeroku () {
  return process.env.NODE && ~process.env.NODE.indexOf('heroku') ? true : false
}

if (isHeroku()) {
  app.use(basicAuth({
    users: { 'admin': process.env.AUTH_KEY }
  }))
}

app.use(express.static(__dirname + '/dist'))

app.listen(port)

console.log('server started ' + port)
