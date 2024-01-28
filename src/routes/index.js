const express = require('express');
const router = express.Router();
const authRoutes = require('./auth/route')
const pillsRoutes = require('./pills/route')
const categoriesRoutes = require('./categories/route')

router.use('/auth', authRoutes);
router.use('/pills', pillsRoutes);
router.use('/categories', categoriesRoutes);

module.exports = router;
