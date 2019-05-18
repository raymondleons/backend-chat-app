const express = require('express')
const app = express()
require('dotenv').config()

const cors = require('cors')

// mongodb library
const mongoose = require('mongoose')

// Cors
app.use(cors())

// app routes import
const index = require('./routes/index')

const devDbUrl = 'mongodb://127.0.0.1:27017/chatapp'
const mongoDB = process.env.MONGO_STRINGCON || devDbUrl

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
mongoose.Promise = global.Promise
const db =  mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// adding routes here
app.use('/', index)

const port = process.env.PORT || 3000

let server =  app.listen(port, (err, res) => {
    if (err) res.send(err)
    else {
        let domain = (server.address().address === '::') ? 'http://localhost:' + server.address
        ().port
            : server.address().address + ':' + server.address().port
            console.log(`Server is up and running on ${domain}`)
    }
})

module.exports = {app}
