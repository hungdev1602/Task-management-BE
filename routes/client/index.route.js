const routeTask = require("./task.route")

module.exports = (app) => {
  
  app.use("/tasks", routeTask)

}