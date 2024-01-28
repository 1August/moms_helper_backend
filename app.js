const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const serverless = require('serverless-http')

const indexRouter = require('./src/routes/index')
const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', indexRouter)

app.set('port', process.env.PORT || 3000)
const dbConnectionUrl = process.env.MONGODB_KEY || ''

const handler = serverless(app)

async function runApp() {
  try {
    await mongoose.connect(dbConnectionUrl)
    // app.listen(app.get('port'), () => {
    //   console.log('App is started on:', `http://localhost:${app.get('port')}`)
    // })
  } catch (error) {
    console.error(error)
  }
}

runApp()

module.exports = handler
