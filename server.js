const express = require('express')
const server = require('serve-static')
const path = require('path')

const app = express()

app.use('/', server(path.join(__dirname, '/dist')))

const port = process.env.PORT || 8080
app.listen(port)

app.get(/.*/,(req,res)=>res.sendFile(path.resolve(__dirname,'dist/index.html')))

console.log('App listening on ' + port)