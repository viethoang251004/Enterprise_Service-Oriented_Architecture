'use strict'

const express = require('express')
const BookController = require('../../controllers/book.controller')
const router = express.Router()
const asyncHandler  = require('../../helpers/asyncHandler')

router.get('/search/:keySearch', asyncHandler(BookController.getListSearchBooks))
router.get('', asyncHandler(BookController.getAllPublishedBooks))
router.get('/:book_id', asyncHandler(BookController.getBook))



// POST
router.use('/create', asyncHandler(BookController.createBook))
router.use('/publish/:id', asyncHandler(BookController.publishBook))
router.use('/unpublish/:id', asyncHandler(BookController.unPublishBook))
// END POST //

// QUERY //
router.get('/draft/all', asyncHandler(BookController.getAllDraftBooks))
router.get('/draft/:id', asyncHandler(BookController.getUserAllDraftBooks))
router.get('/published/:id', asyncHandler(BookController.getUserAllPublishedBooks))
// END QUERY //


module.exports = router