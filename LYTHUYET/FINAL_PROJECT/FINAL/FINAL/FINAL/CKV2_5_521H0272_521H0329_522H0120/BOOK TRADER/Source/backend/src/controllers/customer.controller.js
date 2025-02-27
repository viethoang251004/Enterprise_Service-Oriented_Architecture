'use strict'

const { BadRequestError } = require('../core/error.response')
const { SuccessResponse } = require('../core/success.response')
const { CUSTOMER } = require('../models/customer.model')
const KeyTokenService = require('../services/keyToken.service')
const CustomerService = require('../services/customer.service')

class CustomerController {
    signup = async (req, res, next) => {
        const email = req.body.email
        // console.log("[SIGNUP-EMAIL]::::", req.body)
        const a = await CustomerService.signup({email})
        return new SuccessResponse({
            message: 'create customer account successfully',
            metadata: a
        }).send(res)
    }
}

module.exports = new CustomerController()