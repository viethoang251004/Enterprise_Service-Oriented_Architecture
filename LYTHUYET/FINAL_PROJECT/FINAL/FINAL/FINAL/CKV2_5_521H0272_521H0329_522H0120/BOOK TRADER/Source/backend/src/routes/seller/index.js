'use strict'

const express = require('express')
const SellerController = require('../../controllers/seller.controller')
const router = express.Router()
const asyncHandler  = require('../../helpers/asyncHandler')

router.use('/signup', asyncHandler(SellerController.signup))
router.use('/login', asyncHandler(SellerController.login))
router.use('/logout', asyncHandler(SellerController.logout))
router.patch('/update/:id', asyncHandler(SellerController.update_basic_info))
router.patch('/ghn/:id', asyncHandler(SellerController.update_ghn_info))
router.patch('/bank/:id', asyncHandler(SellerController.update_bank_info))
router.patch('/close/:id', asyncHandler(SellerController.close_account))
router.use('/:id', asyncHandler(SellerController.getAll))

module.exports = router