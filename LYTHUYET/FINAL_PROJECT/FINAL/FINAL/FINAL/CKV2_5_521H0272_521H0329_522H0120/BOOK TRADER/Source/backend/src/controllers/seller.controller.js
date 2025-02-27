'use strict'

const { BadRequestError } = require('../core/error.response')
const { SuccessResponse } = require('../core/success.response')
const { SELLER } = require('../models/seller.model')
const KeyTokenService = require('../services/keyToken.service')
const SellerService = require('../services/seller.service')

class SellerController {
    signup = async (req, res, next) => {
        const email = req.body.email
        // console.log("[SIGNUP-EMAIL]::::", req.body)
        const a = await SellerService.signup({email})
        return new SuccessResponse({
            message: 'create seller account successfully',
            metadata: a
        }).send(res)
    }

    login = async (req, res, next) => {
        const payload = req.body
        const a = await SellerService.login(payload)
        res.cookie('refreshToken', a.refreshToken, {
            httpOnly: true,
            maxAge: 48 * 60 * 60 * 1000,
        })
        res.send({
            message: 'login successfully',
        })
    }

    logout = async (req, res) => {
        const cookie = req.cookies
        const refreshToken = cookie.refreshToken
        if(!refreshToken) throw new BadRequestError('No refresh token')
        const seller = await KeyTokenService.findUserByToken(refreshToken)

        if(!seller) {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
            })
            return res.sendStatus(204)
        }
        
        await SELLER.findByIdAndUpdate({ _id: seller._id }, {
            refreshToken: ""
        })

        res.clearCookie("refreshToken",  {
            httpOnly: true,
            secure: true,
        })
        return res.sendStatus(204)
    }

    getAll = async (req, res) => {
        const seller = await SellerService.get_all({...req.params})
        return new SuccessResponse({
            message: 'get all seller successfully',
            metadata: seller
        }).send(res)
    }

    update_basic_info = async (req, res) => {
        const id = req.params
        const payload = req.body
        const seller = await SellerService.update_seller_basic_info({id: id , payload: payload})
        console.log("[0.1]::::::", seller);
        return new SuccessResponse({
            message: 'update basic info successfully',
            metadata: 1
        }).send(res)
        
    }

    update_ghn_info = async (req, res) => {
        const id = req.params
        const payload = req.body
        const ghn = await SellerService.update_seller_ghn_info({id: id , payload: payload})
        console.log("[0.1]::::::", ghn);
        return new SuccessResponse({
            message: 'update ghn info successfully',
            metadata: 1
        }).send(res)
        
    }

    update_bank_info = async (req, res) => {
        const id = req.params
        const payload = req.body
        const ghn = await SellerService.update_seller_bank_info({id: id , payload: payload})
        return new SuccessResponse({
            message: 'update bank info successfully',
            metadata: ghn
        }).send(res)
        
    }

    close_account = async (req, res) => {
        const id = req.params
        const seller = await SellerService.update_seller_basic_info({ id: id, payload: {status: 'closed', roles: []} })
        return new SuccessResponse({
            message: 'close account successfully',
            metadata: 1
        }).send(res)
    }

}

module.exports = new SellerController()