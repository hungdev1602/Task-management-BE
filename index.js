const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const port = 3000

// Dotenv
require('dotenv').config()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

// Connect to Database
const database = require("./config/database")
database.connect()

// Router
const routeClient = require("./routes/client/index.route")
routeClient(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})