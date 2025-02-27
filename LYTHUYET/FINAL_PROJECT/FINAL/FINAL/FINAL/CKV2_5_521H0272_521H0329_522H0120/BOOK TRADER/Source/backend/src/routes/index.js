'use strict'

const express = require('express')
const router = express.Router()

router.use('/v1/api/cart', require('./cart'))
router.use('/v1/api/book', require('./book'))
router.use('/v1/api/customer', require('./customer'))
router.use('/v1/api/seller', require('./seller'))
router.use('/v1/api/email', require('./email'))

module.exports = router