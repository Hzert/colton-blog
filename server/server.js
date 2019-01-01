const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
// const serverEntry = require('../dist/server-entry').default


const isDev = process.env.NODE_ENV === 'development'

// const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
  


const app = express()

// app.use('/public', express.static(path.join(__dirname,'../dist')))

// app.get('*', function (req, res) {
//   const appString = ReactSSR.renderToString(serverEntry)

//   res.send(template.replace('<!-- app -->',appString))
// })


if(!isDev){
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
  const serverEntry = require('../dist/server-entry').default
  app.use('/public', express.static(path.join(__dirname,'../dist')))

  app.get('*', function (req, res) {
    const appString = ReactSSR.renderToString(serverEntry)

    res.send(template.replace('<!-- app -->',appString))
  })
}else{
  const devStatic = require('./until/dev.static')
  devStatic(app)
}

app.listen(3333, function () {
  console.log('server is listening on 3333')
})