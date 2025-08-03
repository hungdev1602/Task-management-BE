
const Task = require("../../models/task.model")

module.exports.index = async (req, res) => {
  const find = {
    $or: [
      { createdBy: req.user.id },
      { listUser: req.user.id }
    ],
    deleted: false
  }
  const sort = {}

  // Làm bộ lọc (filter) theo trạng thái (status)
  // example "/tasks?status=finish"
  if(req.query.status){
    find.status = req.query.status
  }
  // end filter

  // Sort theo tiêu chí
  // example: "/tasks?sortKey=title&sortValue=asc"
  if(req.query.sortKey && req.query.sortValue){
    sort[req.query.sortKey] = req.query.sortValue
  }
  // end sort

  // Phân trang (pagination)
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 5
  const skip = (page - 1) * limit
  // end pagination

  // Tìm kiếm (search)
  if(req.query.keyword){
    const regex = new RegExp(req.query.keyword, "i")
    find.title = regex
  }
  // end search
  
  const tasks = await Task
    .find(find)
    .sort(sort)
    .skip(skip)
    .limit(limit)

  res.status(200).json({
    message: "success!",
    data: tasks
  })
}

module.exports.detail = async (req, res) => {
  const id = req.params.id
  const task = await Task.findOne({
    _id: id,
    $or: [
      { createdBy: req.user.id },
      { listUser: req.user.id }
    ],
    deleted: false
  })

  if(!task){
    res.status(400).json({
      message: "Task not found"
    })
    return
  }
  res.status(200).json({
    message: "success!",
    data: task
  })
}

module.exports.changeMulti = async (req, res) => {
  const ids = req.body.ids
  const status = req.body.status

  await Task.updateMany({
    _id: { $in: ids}
  }, {
    status: status
  })

  res.status(200).json({message: "OK"})
}

module.exports.createPost = async (req, res) => {
  const data = req.body
  data.createdBy = req.user.id

  const task = new Task(data)
  await task.save()

  res
    .status(200)
    .json(
      {
        message: "OK", 
        data: task
      }
    )
}

module.exports.editPatch = async (req, res) => {
  const id = req.params.id
  const data = req.body

  await Task.updateOne({
    _id: id
  }, data)

  res.status(200).json({
    message: "OK"
  })
}

module.exports.deletePatch = async (req, res) => {
  const ids = req.body.ids

  await Task.updateMany({
    _id: {$in: ids}
  }, {
    deleted: true
  })

  res.status(200).json({
    message: "OK"
  })
}

module.exports.deletePermanently = async (req, res) => {
  const ids = req.body.ids
  await Task.deleteMany({
    _id: {$in: ids}
  })

  res.status(200).json({
    message: "OK"
  })
}