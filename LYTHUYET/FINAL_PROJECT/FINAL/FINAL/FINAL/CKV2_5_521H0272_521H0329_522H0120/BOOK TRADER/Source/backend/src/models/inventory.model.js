'use strict'

const { model, Schema, Types } = require('mongoose')

const DOCUMENT_NAME = 'Inventory'
const COLLECTION_NAME = 'Inventories'

const inventorySchema = new Schema({
    inven_book_id : { type: Schema.Types.ObjectId, ref: 'Book'},
    inven_stock : { type: Number, required: true }, // số lượng tồn kho
    inven_seller_id:  { type: Schema.Types.ObjectId, ref: 'BookDetail'},
    inven_reservations: { type: Array, default: [] } // đặt hàng trước
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = {
    inventory: model(DOCUMENT_NAME, inventorySchema)
}