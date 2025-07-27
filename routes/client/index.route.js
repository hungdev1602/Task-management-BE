const routeTask = require("./task.route")
const routeUser = require("./user.route")
module.exports = (app) => {
  
  app.use("/tasks", routeTask)

  app.use("/users", routeUser)
}