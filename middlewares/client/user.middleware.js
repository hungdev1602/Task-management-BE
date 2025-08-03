const User = require("../../models/user.model")

module.exports.requireAuth = async (req, res, next) => {

  const token = req.headers.authorization.split(" ")[1]
  if(!token){
    res.status(400).json({
      message: "Require token"
    })
    return
  }

  const existUser = await User.findOne({
    token: token,
    deleted: false
  })

  if(!existUser){
    res.status(400).json({
      message: "Invalid token"
    })
    return
  }

  req.user = existUser

  next()
}