'use strict'

'use strict'

const { model, Schema, Types } = require('mongoose')

const DOCUMENT_NAME = 'Cart'
const COLLECTION_NAME = 'Carts'

const cartSchema = new Schema({
    cart_state: {
        type: String, required: true,
        enum: ['active', 'completed', 'failed', 'pending'],
        default: 'active'
    },
    cart_books: {
        type: Array, required: true,
        default: []
    },
    cart_count_book : { type: Number, default: 1 },
    cart_user_id: { type: String, required: true }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = {
    cart: model(DOCUMENT_NAME, cartSchema)
}