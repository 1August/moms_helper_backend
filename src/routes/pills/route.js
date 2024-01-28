const express = require('express')
const { Pill } = require('../../models/Pill')
const { Category } = require('../../models/Category')
const router = express.Router()

// /api/pills/pill
router.get('/pill', async (req, res) => {
  try {
    const { id } = req.query
    const pill = await Pill.findById(id).populate('categories')
    res.json(pill)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// /api/pills
router.get('/', async (req, res) => {
  try {
    const pills = await Pill.find().populate('categories')
    res.json(pills)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// /api/pills/pill
router.post('/pill', async (req, res) => {
  try {
    const { ...pill } = req.body

    const candidate = await Pill.findOne({ title: pill.title })

    if (candidate) {
      return res.status(401).json({
        message: 'Pill already registered',
      })
    }

    const newPill = new Pill(pill)
    await newPill.save()

    res.json({
      title: pill.title,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
