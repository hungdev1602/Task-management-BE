const User = require("../../models/user.model")
const md5 = require("md5")

const generateHelper = require("../../helpers/generate.helper")

module.exports.register = async (req, res) => {
  console.log(req.body)
  const user = req.body

  // Check xem email đã tồn tại trong DB chưa
  const existUser = await User.findOne({
    email: user.email,
    deleted: false
  })

  if(existUser) {
    res.json({
      message: "Email đã tồn tại trong hệ thống"
    })
    return
  }

  // data hoàn chỉnh để lưu vào DB
  const dataUser = {
    fullName: user.fullName,
    email: user.email,
    password: md5(user.password),
    token: generateHelper.generateRandomString(30),
  }

  const newUser = new User(dataUser)
  await newUser.save()

  res.json({
    message: "Đăng ký tài khoản thành công!",
    token: newUser.token
  })
}