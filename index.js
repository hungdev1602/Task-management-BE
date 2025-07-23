const express = require("express")
const app = express()
const port = 3000

// Dotenv
require('dotenv').config()

// Connect to Database
const database = require("./config/database")
database.connect()

const Task = require("./models/task.model")


app.get("/tasks", async (req, res) => {
  const tasks = await Task.find({
    deleted: false
  })
  res.json(tasks)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})