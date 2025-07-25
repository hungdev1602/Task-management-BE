const mongoose = require("mongoose")

const taskSchema = mongoose.Schema(
  {
    title: String,
    status: String,
    content: String,
    timeStart: Date,
    timeFinish: Date,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  },
  {
    timestamps: true
  }
)

const Task = mongoose.model("Task", taskSchema, "task")

module.exports = Task