'use strict'

const express = require('express')
const CustomerController = require('../../controllers/customer.controller')
const router = express.Router()
const asyncHandler  = require('../../helpers/asyncHandler')

router.use('/signup', asyncHandler(CustomerController.signup))


module.exports = router