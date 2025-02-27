'use strict'

const { NotFoundError } = require('../core/error.response')
const { cart } = require('../models/cart.model')
const { getBookById } = require('../models/repositories/book.repo')


/*
    features:
    - add books [User]
    - reduce book quantity by one [User]
    - increase book qunantity by one [User]
    - get cart [User]
    - delete cart [User]
    - delete cart items [User]
*/

class CartService {

    static async createUserCart({user_id, book}){
        const query = { cart_user_id: user_id, cart_state: 'active' },
        updateOrInsert = {
            $addToSet: {
                cart_books: book
            }
        }, options = { upsert: true, new: true }
        return await cart.findOneAndUpdate(query, updateOrInsert, options)
    }

    static async updateUserCartQuantity({user_id, book}){
        const { book_id, quantity } = book
        const query = { 
            cart_user_id: user_id, 
            // tìm kiếm sp với id có trong giỏ hàng không
            'cart_books.book_id': book_id,
            cart_state: 'active'
        }, updateSet = {
            'cart_books.$.quantity': quantity
        }, options = { upsert: true, new: true }
        
        return await cart.findOneAndUpdate(query, updateSet, options)
    }

    static async addToCart({user_id, book = {}}) {
        // check cart 
        const userCart = await cart.findOne({ cart_user_id: user_id })
        if(!userCart) {
            // create cart for user
            return await CartService.createUserCart({user_id, book})
        }

        // giỏ hàng đã tồn tại nhưng chưa có sản phẩm
        if (!userCart.cart_books.length) {
            userCart.cart_books = [book]
            return await userCart.save()
        }

        // giỏ hàng tồn tại và có sản phẩm => update quantity
        return await CartService.updateUserCartQuantity({ user_id, book })
    }

    // update cart
    /*
        user_order_ids = [
            user_id,
            item_books: [
                quantity,
                price,
                user_id,
                book_id
                old_quantity,
            ],
            version => giá sp thay đổi 
        ]
    */
    static async addToCartV2({user_id, book = {}}) {
        const { book_id, quantity, old_quantity } = user_order_ids[0]?.item_books[0]
        // check sp tồn tại
        const foundBook = getBookById(book_id)
        if(!foundBook) throw new NotFoundError('Book not found')
        
        // compare
        if(foundBook.user_id.toString() !== user_order_ids[0]?.user_id) {
            throw new NotFoundError('Book not belong to the user')
        }

        if( quantity === 0 ) {
            // delete
        }

        return await CartService.updateUserCartQuantity({
            user_id,
            book: {
                book_id,
                quantity: quantity - old_quantity,

            }
        })

    }

    static async deleteUserCart({user_id, book_id}) {
        const query = { cart_user_id: user_id, cart_state: 'active' },
        updateSet = {
            $pull: {
                cart_books: {
                    book_id
                }
            }
        }
        const deleteCart = await cart.updateOne(query, updateSet)
        return deleteCart
    }

    static async getListUserCart({user_id}) {
        return await cart.findOne({
            cart_user_id: user_id,

        }).lean()
    }
}

module.exports = CartService