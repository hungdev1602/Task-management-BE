
const Task = require("../../models/task.model")

module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }
  const sort = {}

  // Làm bộ lọc theo trạng thái (status)
  // example "/tasks?status=finish"
  if(req.query.status){
    find.status = req.query.status
  }

  // Sort theo tiêu chí
  // example: "/tasks?sortKey=title&sortValue=asc"
  if(req.query.sortKey && req.query.sortValue){
    sort[req.query.sortKey] = req.query.sortValue
  }

  const tasks = await Task.find(find).sort(sort)
  res.json(tasks)
}

module.exports.detail = async (req, res) => {
  const id = req.params.id
  const task = await Task.findOne({
    _id: id,
    deleted: false
  })
  res.json(task)
}