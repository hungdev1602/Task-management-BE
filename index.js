const express = require("express")
const cors = require('cors')
const bodyParser = require("body-parser")

const app = express()
const port = 3000

// CORS

// cho phép 1 tên miền cụ thể truy cập
// const corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// cors(corsOptions)


app.use(cors()) //Enable All CORS Requests

// End CORS

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