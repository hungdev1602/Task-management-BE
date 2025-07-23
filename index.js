const express = require("express")
const app = express()
const port = 3000

// Dotenv
require('dotenv').config()

// Connect to Database
const database = require("./config/database")
database.connect()


app.get("/", (req, res) => {
  res.send("hehe")
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})