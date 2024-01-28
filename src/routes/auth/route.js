const express = require('express')
const { User } = require('../../models/User')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(401).json({
      message: 'User not found',
    })
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({
      message: 'Invalid credentials',
    })
  }

  const HOUR_IN_SECONDS = 60 * 60
  const DAY_IN_HOURS = 24 * HOUR_IN_SECONDS
  const token = jwt.sign({
    id: user._id,
    email,
  }, process.env.JWT_KEY, {
    expiresIn: 10 * DAY_IN_HOURS, // 10 days
  })

  res.json({
    user: {
      id: user._id,
      email,
    },
    token,
  })
})

// /api/auth/signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body

  const candidate = await User.findOne({ email })

  if (candidate) {
    return res.status(401).json({
      message: 'Email in use',
    })
  }

  const salt = await bcrypt.genSalt()

  const hashedPassword = bcrypt.hashSync(password, salt)
  const user = new User({
    email,
    password: hashedPassword,
  })
  await user.save()

  res.json({
    email,
  })
})

module.exports = router
