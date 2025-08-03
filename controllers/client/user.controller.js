const User = require("../../models/user.model")
const ForgotPassword = require("../../models/forgotPassword.model")
const md5 = require("md5")

const generateHelper = require("../../helpers/generate.helper")
const sendMailHelper = require("../../helpers/sendMail.helper")

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

module.exports.login = async (req, res) => {
  const { email, password } = req.body

  if(!password || !email){
    res.status(400).json({
      message: "Require email and password"
    })
    return
  }

  const user = await User.findOne({
    email: email,
    deleted: false
  })

  if(!user){
    res.status(400).json({
      message: "Invalid credentials"
    })
    return
  }

  if(md5(password) !== user.password){
    res.status(400).json({
      message: "Invalid credentials"
    })
    return
  }

  res.status(200).json({
    message: "Login successfully",
    token: user.token
  })
}

module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body
  console.log(email)

  const userExist = await User.findOne({
    email: email,
    deleted: false
  })

  if(!userExist){
    res.status(400).json({
      message: "Invalid credentials"
    })
    return
  }

  // Việc 1: Lưu email và mã OTP vào database
  const existEmailInForgotPassword = await ForgotPassword.findOne({
    email: email
  })

  if(!existEmailInForgotPassword){ //lần đầu gửi mail để lấy otp
    const otp = generateHelper.generateRandomNumber(6)

    const data = {
      email: email,
      otp: otp,
      expireAt: Date.now() + 5 * 60 * 1000 //xoá sau 5p từ khi khởi tạo
    }

    const record = new ForgotPassword(data)
    await record.save()

    // Việc 2: Gửi mã OTP qua email cho user
    const subject = "OTP code authentication"
    const text = `Your verification code is <b>${otp}</b>. The OTP code is valid for 5 minutes, please do not provide the OTP code to anyone.`

    sendMailHelper.sendMail(email, subject, text)
  }

  res.status(200).json({
    message: "Email sent successfully"
  })
}