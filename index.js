const mongoose = require('mongoose')
const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const router = require('./server/routes/routes')
const API_PORT = 8080
const app = express()
const URI = require('./server/keys').URI
app.use(cors())

// this is our MongoDB database
const dbRoute = URI
mongoose.connect(dbRoute, { useUnifiedTopology: true, useNewUrlParser: true  })
let db = mongoose.connection

db.once('open', () => console.log('----------------CONNECTED TO THE DATABASE------------'))
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))
// append /api for our http requests
app.use('/api', router)
// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`))
