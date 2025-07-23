const express = require("express")
const app = express()
const port = 3000

// Dotenv
require('dotenv').config()

// Connect to Database
const database = require("./config/database")
database.connect()

// Router
const routeClient = require("./routes/client/index.route")
routeClient(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})