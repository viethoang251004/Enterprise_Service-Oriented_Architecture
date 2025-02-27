'use strict'

const { Types } = require('mongoose')
const { BadRequestError } = require('../core/error.response')
const { book, bookDetail } = require('../models/book.model')
const { 
    findUserAllDraftBooks, 
    publishBook, 
    findAllPublishedBooks, 
    findUserAllPublishedBooks,
    findAllDraftBooks,
    unPublishBook,
    searchBooksByUser,
    findBook
} = require('../models/repositories/book.repo')

const { insertInventory } = require('../models/repositories/inventory.repo')

class BookFactory {
    static async createBook( payload ) {
        try {
            return new BookDetail(payload).createBook()
        } catch (error) {
            throw new BadRequestError(error)
        }
    }

    //// QUERY ////
    // Get a list of draft books
    static async findAllDraftBooks ( limit = 50, skip = 0) {
        const query = { isPublished: false }
        return await findAllDraftBooks({ query, limit, skip })
    }

    // Get a list of all published books
    static async findAllPublishedBooks ( { limit = 50, sort = 'ctime', page = 1, filter = { isPublished: true } } ) {
        return await findAllPublishedBooks({ limit, sort, page, filter, 
            select : ['book_name', 'book_price', 'book_coverLink']
        })
    }

    // Get a list of all the seller' draft books
    static async findUserAllDraftBooks ( {book_seller_id, limit = 50, skip = 0} ) {
        const query = { book_seller_id, isPublished: false }
        return await findUserAllDraftBooks({ query, limit, skip })
    }    

    // Get a list of the seller' publish books
    static async findUserAllPublishedBooks ( {book_seller_id, limit = 50, skip = 0} ) {
        const query = { book_seller_id, isPublished: true }
        return await findUserAllPublishedBooks({ query, limit, skip })
    }

    // Search books
    static async searchBooks ( { keySearch } ) { 
        return await searchBooksByUser({ keySearch })
    }

    // Find a book
    static async findBook( { book_id } ) {
        return await findBook({ book_id, unSelect: ['__v'] })
    }
    //// END QUERY ////

    // PUT //
    static async publishBook( { book_id } ) {
        return await publishBook({ book_id })
    }

    static async unPublishBook( { book_id } ) {
        return await unPublishBook({ book_id })
    }

    // update book 
    static async updateBook({book_id, payload}) {

    }

    // END PUT //

}


class Book {
    constructor({
        book_name, book_author, book_description, book_price, book_quality, book_quantity,
        book_genre, book_coverLink, book_seller_id, book_slug, book_details
    }) {
        this.book_name = book_name,
        this.book_author = book_author,
        this.book_description = book_description,
        this.book_price = book_price,
        this.book_quality = book_quality,
        this.book_quantity = book_quantity,
        this.book_genre = book_genre,
        this.book_coverLink = book_coverLink,
        this.book_seller_id = book_seller_id,
        this.book_slug = book_slug,
        this.book_details = book_details
    }

    async createBook(book_id){
        const newBook =  await book.create({ ...this, _id: book_id })
        if (newBook) {
            // add book -> inventory
            await insertInventory({
                book_id: newBook._id,
                seller_id: this.book_seller_id,
                stock: this.book_quantity
            })
        }
        return newBook
    }

    async updateBook (book_id, payload) {

    }
}

class BookDetail extends Book {
    async createBook() {
        const newBookDetail = await bookDetail.create({
            ...this.book_details,
            book_seller_id: this.book_seller_id
        })
        if(!newBookDetail) throw new BadRequestError('Create new book detail error')
        const newBook = await super.createBook(newBookDetail._id)
        if (!newBook) throw new BadRequestError('Create new book error')
        return newBook
    }

    async updateBook(book_id) {
        const objectParams = removeUndefinedObj(this)
        if (objectParams.book_details) {
            await bookDetail.findByIdAndUpdate(book_id , updateNestedObjectParser(objectParams), { new: true })
        }
        const a = await super.updateBook(book_id, objectParams)
        return a
    }
}

module.exports = BookFactory