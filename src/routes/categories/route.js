const express = require('express')
const { Category } = require('../../models/Category')
const { Pill } = require('../../models/Pill')
const router = express.Router()

// // /api/categories/category
// router.get('/category', async (req, res) => {
//   const { label } = req.query
//
//   const category = await Category.findOne({ label })
//
//   if (!category) {
//     return res.status(401).json({
//       message: 'Category not found',
//     })
//   }
//
//   res.json(category)
// })

// /api/categories/
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// /api/categories/category
router.post('/category', async (req, res) => {
  const { ...category } = req.body

  const candidate = await Category.findOne({ label: category.label })

  if (candidate) {
    return res.status(401).json({
      message: 'This category name exists',
    })
  }

  const newCategory = new Category(category)
  await newCategory.save()

  res.json({
    label: category.label,
  })
})

module.exports = router
