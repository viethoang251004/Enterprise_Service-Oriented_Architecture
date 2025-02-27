'use strict'

const BookService = require('../services/book.service')
const { SuccessResponse } = require('../core/success.response')
const KeyTokenService = require('../services/keyToken.service')
const { BadRequestError } = require('../core/error.response')
const { SELLER }= require('../models/seller.model')

class BookController {
    createBook = async (req, res, next) => {
        // lấy thông tin user từ cookie
        const cookie = req.cookies
        const refreshToken = cookie.refreshToken
        const user = await KeyTokenService.findUserByToken(refreshToken)
        if(!user) return new BadRequestError('No user found')

        return new SuccessResponse({
            message: "Create book successfully",
            metadata: await BookService.createBook({
                ...req.body, 
                book_seller_id: user.id})
        }).send(res)
    }

    publishBook = async (req, res, next) => {
        const book = await BookService.publishBook({book_id: req.params.id})
        if (book === false) throw new BadRequestError("Invalid Book")
        return new SuccessResponse({
            message: "Publish book successfully",
            metadata: book
        }).send(res)
    }

    unPublishBook = async (req, res, next) => {
        const book = await BookService.unPublishBook({book_id: req.params.id})
        if (book === false) throw new BadRequestError("Invalid Book")
        return new SuccessResponse({
            message: "Unpublish book successfully",
            metadata: book
        }).send(res)
    }

    updateBook = async (req, res, next) => {
        const cookie = req.cookies
        const refreshToken = cookie.refreshToken
        const user = await KeyTokenService.findUserByToken(refreshToken)
        if(!user) return new BadRequestError('No user found')
        
        const book = await BookService.updateBook({...req.body, book_id: req.params.id, book_seller_id: user.id})
        return new SuccessResponse({
            message: "update book successfully",
            metadata: book
        }).send(res)
    }

    // QUERY //
    getAllDraftBooks = async (req, res, next) => { 
        return new SuccessResponse({ 
            message: "Get all draft book successfully",
            metadata: await BookService.findAllDraftBooks()
        }).send(res)
    }

    getUserAllPublishedBooks = async (req, res, next) => {
        const userId = await SELLER.findOne({_id: req.params.id})
        if (userId === false) throw new BadRequestError("User not found")
        return new SuccessResponse({ 
            message:  `Get user published books successfully`,
            metadata: await BookService.findUserAllPublishedBooks({ book_seller_id: req.params.id})
        }).send(res)
    }

    getUserAllDraftBooks = async (req, res, next) => {
        const userId = await SELLER.findOne({_id: req.params.id})
        if (userId === false) throw new BadRequestError("User not found")
        return new SuccessResponse({ 
            message:  `Get user draft books successfully`,
            metadata: await BookService.findUserAllDraftBooks({ book_seller_id: req.params.id})
        }).send(res)
    }

    getAllPublishedBooks = async (req, res, next) => {
        return new SuccessResponse({ 
            message: "Get all published books successfully",
            metadata: await BookService.findAllPublishedBooks( req.query )
        }).send(res)
    }

    getListSearchBooks = async (req, res, next) => {
        return new SuccessResponse({ 
            message: "Get all search books successfully",
            metadata: await BookService.searchBooks( req.params )
        }).send(res)
    }

    getBook = async (req, res, next) => {
        // console.log(req.params.book_id )
        return new SuccessResponse({ 
            message: "Get book successfully",
            metadata: await BookService.findBook( { book_id: req.params.book_id } )
        }).send(res)
    }
    // END QUERY //




}

module.exports = new BookController()