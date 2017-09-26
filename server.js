var express = require('express')
var app = express()
var basicAuth = require('express-basic-auth')

var port = process.env.PORT || 5000

app.use(basicAuth({
  users: { 'admin': process.env.AUTH_KEY },
  challenge: true
}))

app.use(express.static(__dirname + '/dist'))

app.listen(port)

console.log('server started ' + port)
