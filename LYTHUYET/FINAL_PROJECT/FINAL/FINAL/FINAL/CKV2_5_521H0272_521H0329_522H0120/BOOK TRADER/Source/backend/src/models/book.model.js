'use strict'

const { model, Schema, Types } = require('mongoose'); 
const slugify = require('slugify');

const DOCUMENT_NAME = 'Book'
const COLLECTION_NAME = 'Books'

const BookSchema = new Schema({
    book_name: { type: String, require: true }, 
    book_author: { type: Array, require: true },
    book_description: { type: String },
    book_price: {type: Number, require: true},
    book_quantity: {type: Number, require: true},
    book_quality: {type: String, require: true, enum: ['New', 'Like New']},
    book_genre: {type: String, require: true, enum: ['Fiction', 'Non-Fiction']}, // thể loại
    book_coverLink: {type: String, default: null}, // ảnh
    book_seller_id: {type: Schema.Types.ObjectId, ref: 'Seller'},
    book_slug: { type: String },
    book_ratingAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: (val) => Math.round(val * 10) / 10 

    },
    isPublished: { type: Boolean, default: false, index: true, select: false },
    book_details: { type: Schema.Types.Mixed, require: true }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

// create index for search 
BookSchema.index({ book_name: 'text', book_description: 'text', book_author: 'text', book_slug: 'text' })

// name -> slug 
BookSchema.pre('save', function( next ){
    this.book_slug = slugify(toString(this.book_name), {lower: true})
    next()
})

const BookDetailSchema = new Schema({
    book_coverType: {type: String, required: true, enum: ['HardCover', 'Paperback']}, // bìa cứng, bìa mềm
    book_publisher: {type: String},  // nhà xuất bản
    book_published_year: {type: String},  // nhà xuất bản
    book_length: {type: Number, required: true}, // dài
    book_width: {type: Number, required: true}, // rộng
    book_height: {type: Number, required: true}, // cao
    book_weight: {type: Number, required: true}, // nặng
    // version: {type: Number, default: 0.0}, // version: mỗi lần update sp => tăng version
    book_user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {
    collection: 'BookDetails',
    timestamps: true
})

module.exports = {
    book: model(DOCUMENT_NAME, BookSchema),
    bookDetail: model('BookDetail', BookDetailSchema)
}

