'use strict'

const { SuccessResponse } = require("../core/success.response")
const CartService = require("../services/cart.service")

class CartController {

    addToCart = async (req, res, next) => {
        return new SuccessResponse({
            message: 'create new cart success',
            metadata: await CartService.addToCart(req.body)
        }).send(res)
    }

    update = async (req, res, next) => {
        return new SuccessResponse({
            message: "update cart successfully",
            metadata: await CartService.addToCartV2( req.body )
        }).send(res)
    }

    delete = async (req, res, next) => {
        return new SuccessResponse({
            message: "delete cart successfully",
            metadata: await CartService.deleteUserCart( req.body )
        }).send(res)
    }

    list = async (req, res, next) => {
        return new SuccessResponse({
            message: "Get list cart successfully",
            metadata: await CartService.getListUserCart( req.body )
        }).send(res)
    }
}

module.exports = new CartController()