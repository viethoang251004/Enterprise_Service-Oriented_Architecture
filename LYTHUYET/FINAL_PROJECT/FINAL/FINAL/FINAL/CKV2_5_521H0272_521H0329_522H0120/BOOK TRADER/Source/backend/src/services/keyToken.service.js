'use strict'
const jwt = require('jsonwebtoken')
const { SELLER }  = require('../models/seller.model')

class KeyTokenService {
    static generateToken = (id) => {
        return jwt.sign({ id: id}, process.env.JWT_SERECT, { expiresIn: '2d' })
    }

    static generateRefreshToken = (id) => {
        return jwt.sign({ id: id}, process.env.JWT_SERECT, { expiresIn: '2d' })
    }

    static findUserByToken =  async (token) => {
        const decode = jwt.verify(token, process.env.JWT_SERECT)
        const seller = decode.id
        return await SELLER.findOne({ _id: seller })
    }

}

module.exports = KeyTokenService