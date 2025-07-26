const express = require("express")
const router = express.Router()

const controller = require("../../controllers/client/task.controller")

router.get("/", controller.index)

router.get("/:id", controller.detail)

router.patch("/change-multi", controller.changeMulti)

module.exports = router