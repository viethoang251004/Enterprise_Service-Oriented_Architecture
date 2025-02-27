'use strict'

const { book, bookDetail } = require('../book.model')
const { Types } = require('mongoose')
const { getSelectedData, unGetSelectData, convertToObjectMongoDB } = require('../../utils/index')

// QUERY //
const findAllDraftBooks = async( { query, limit, skip } ) => {
    return await book.find( query )
    .sort({ updateAt: -1 }) // lấy mới nhất
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()
}

const findUserAllPublishedBooks = async( { query, limit, skip } ) => {
    return await book.find( query )
    // .populate('book_user', '-_id')
    .sort({ updateAt: -1 }) // lấy mới nhất
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()
}

const findUserAllDraftBooks = async( { query, limit, skip } ) => {
    return await book.find( query )
    // .populate('book_user', '-_id')
    .sort({ updateAt: -1 }) // lấy mới nhất
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()
}

const findAllPublishedBooks = async( { limit,  sort, page , filter, select } ) => {
    const skip = (page - 1) * limit
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    const books = await book.find( filter ).
    sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getSelectedData(select))
    .lean()
    return books
}

const searchBooksByUser = async( { keySearch } ) => {
    const regexSearch = new RegExp(keySearch)
    const results = await book.find({
        isPublished: true,
        $text: { $search: regexSearch},   
    }, {score: { $meta: 'textScore' }})
    .sort({score: { $meta: 'textScore' }})
    .lean()
    return results
}

const findBook = async ( { book_id, unSelect } ) => {
    return await book.findById(book_id).select(unGetSelectData(unSelect))
}

const getBookById = async(book_id)  => {
    return await book.findOne({_id: convertToObjectMongoDB(book_id)}).lean()
}

// END QUERY //

const publishBook = async ({ book_id }) => {
    const foundBookUser = await book.findOne({
        _id: new Types.ObjectId(book_id)
    })
    // console.log("BOOK::", foundBookUser)
    if (!foundBookUser) return false

    foundBookUser.isDraft = false
    foundBookUser.isPublished = true
    // console.log("BOOK::::", foundBookUser)

    const { modifiedCount } = await foundBookUser.updateOne(foundBookUser)
    return modifiedCount // update success ? 0 : 1 
}

const unPublishBook = async ({ book_id }) => {
    const foundBookUser = await book.findOne({
        _id: new Types.ObjectId(book_id)
    })
    if (!foundBookUser) return false

    foundBookUser.isDraft = true
    foundBookUser.isPublished = false

    const { modifiedCount } = await foundBookUser.updateOne(foundBookUser)
    return modifiedCount // update success ? 0 : 1 
}

module.exports = {
    findUserAllDraftBooks,
    findAllPublishedBooks,
    publishBook,
    findUserAllPublishedBooks,
    findAllDraftBooks,
    unPublishBook,
    searchBooksByUser,
    findBook,
    getBookById
}