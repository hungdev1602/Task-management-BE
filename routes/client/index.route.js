const routeTask = require("./task.route")
const routeUser = require("./user.route")

const userMiddleware = require("../../middlewares/client/user.middleware")

module.exports = (app) => {
  
  app.use("/tasks", userMiddleware.requireAuth, routeTask)

  app.use("/users", routeUser)
}