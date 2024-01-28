const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const indexRouter = require('./src/routes/index')
const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', indexRouter)

const PORT = +process.env.POST || 3000
const dbConnectionUrl = process.env.MONGODB_KEY || ''


async function runApp() {
  try {
    await mongoose.connect(dbConnectionUrl)
    app.listen(PORT, () => {
      console.log('App is started on:', `http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
}

runApp()