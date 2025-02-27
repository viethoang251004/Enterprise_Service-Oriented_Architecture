'use strict'

const { inventory } = require("../inventory.model")
const { Types } = require('mongoose')

const insertInventory = async({
    book_id, seller_id, stock
}) => {
    return await inventory.create({
        inven_book_id: book_id,
        inven_stock: stock,
        inven_seller_id: seller_id
    })
}

module.exports = {
    insertInventory
}