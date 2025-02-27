'use strict'

const { SELLER, GHNACC, BANKACCOUNT } = require('../models/seller.model')
const { BadRequestError } = require('../core/error.response')
const bcrypt = require('bcrypt')
const { sendEmail } = require('../configs/init.nodemailer')
const { sendEmailSignUp } = require('./email.service')
const KeyTokenService = require('./keyToken.service')
const { unGetSelectData, removeUndefinedObj, updateNestedObjectParser, convertToObjectMongoDB } = require('../utils')

const Roles = {
    ADMIN: '0000',
    SELLER: '0001',
    CUSTOMER: '0002'
}

class SellerService {
    static signup = async ({ email }) => {
        // check exists email
        const seller = await SELLER.findOne({ email }).lean()
        if (seller) return { 
            message: "existed email",
            metadata: 0
        }

        // mật khẩu tạm thời là email
        const hashPass = await bcrypt.hash(email, 10)
        
        const s = await new Seller({email: email, password: hashPass}).createSeller()

        const a = await new GHN({ seller_id: s._id }).createGHN()

        const b = await new Bank({ seller_id: s._id }).createBankAcc()

        // send email
        const result = await sendEmailSignUp({email})
        
        return result  
    }

    static login = async ({ email, password }) => {
        // check exists email
        const seller = await SELLER.findOne({ email })

        // email not exist
        if (!seller) return {
            message: "account not exist"
        }

        // existed email
        // 1. check last access == null ? update roles, update last access : pass
        if(seller.last_access === null) {
            seller.roles = Roles.SELLER
            seller.status = 'active'
            seller.last_access = Date.now()
            const updated = await seller.updateOne(seller)
        }
        
        // 2. check password
        const match = await bcrypt.compare(password, seller.password)
        if(!match) throw new BadRequestError('Wrong Credential')
        const refreshToken = KeyTokenService.generateRefreshToken(seller._id)


        const updateSellerToken = await SELLER.findByIdAndUpdate(
            seller._id,
            {
                refreshToken: refreshToken,
                last_access: new Date(Date.now())
            },
            {new: true}
        )

        const token = KeyTokenService.generateToken(seller._id) 

        return {
            message: "Logged in successfully",
            token, 
            refreshToken
        }
    }

    static get_all = async({ id }) => {
        const unSelect = ['__v', 'createdAt', 'updatedAt']
        const seller = await SELLER.findById(id).select(unGetSelectData(unSelect))
        if(!seller) return {
            message: 'seller not found'
        }
        const seller_ghn = await GHNACC.findOne({seller_id: id}).select(unGetSelectData(unSelect))
        const seller_bank = await BANKACCOUNT.findOne({seller_id: id}).select(unGetSelectData(unSelect))
        return {
            metadata: {
                seller: seller, 
                ghn: seller_ghn, 
                bank: seller_bank
            }
        }
    }

    static update_seller_basic_info = async({ id, payload }) => {
        const seller_id = convertToObjectMongoDB(id.id)
        const seller = await SELLER.findById(seller_id)
        if(!seller) return {
            message: 'seller not found'
        }
        const update_info = await new Seller(payload).update_seller_basic_info(seller_id)
        return update_info
    }

    
    static update_seller_ghn_info = async({ id, payload }) => {
        const seller_id = convertToObjectMongoDB(id.id)
        const ghn = await GHNACC.findOne({seller_id: seller_id})
        if(!ghn) return {
            message: 'seller not found'
        }
        const update_info = await new GHN(payload).update_seller_ghn_info(ghn._id)
        return update_info
    }

    static update_seller_bank_info = async({ id, payload }) => {
        const seller_id = convertToObjectMongoDB(id.id)
        const bank = await BANKACCOUNT.findOne({seller_id: seller_id})
        if(!bank) return {
            message: 'seller not found'
        }
        const update_info = await new Bank(payload).update_seller_bank_info(bank._id)
        return update_info
    }

}


class Seller {
    constructor({
        email, fullname, password, phone, address, ward, district, province , roles, last_access, status, 
        // ghnAcc, bankAcc
    }) {
        this.email = email,
        this.fullname = fullname,
        this.password = password,
        this.phone = phone,
        this.address = address,
        this.ward = ward,
        this.district = district,
        this.province = province
        this.roles = roles,
        this.last_access = last_access,
        this.status = status

    }

    async createSeller() {
        const s = await SELLER.create(this);
        return s
    }

    async update_seller_basic_info(id) {
        const objectParams = removeUndefinedObj(this)
        const a = await SELLER.findByIdAndUpdate(id , updateNestedObjectParser(objectParams), { new: true })
        return a
    }
    
}

class GHN {
    constructor({
        seller_id, ghn_shop_id, ghn_client_id, ghn_token_id
    }) {
        this.seller_id = seller_id,
        this.ghn_shop_id = ghn_shop_id,
        this.ghn_client_id = ghn_client_id
        this.ghn_token_id = ghn_token_id
    }
    async createGHN(){
        const new_GHNAcc = await GHNACC.create(this)
        if (!new_GHNAcc) throw new BadRequestError('Create new ghn_acc error')
        return new_GHNAcc
    }

    async update_seller_ghn_info(id) {
        const objectParams = removeUndefinedObj(this)
        const a = await GHNACC.findByIdAndUpdate(id , updateNestedObjectParser(objectParams), { new: true })
        return a
    }
}

class Bank {
    constructor({ 
        seller_id, bank_name, account_name, account_number
    }) {
        this.seller_id = seller_id,
        this.bank_name = bank_name,
        this.account_name = account_name,
        this.account_number = account_number
    }
    async createBankAcc(){
        const new_bankAcc = await BANKACCOUNT.create(this)
        if (!new_bankAcc) throw new BadRequestError('Create new bank_acc error')
        return new_bankAcc
    }

    async update_seller_bank_info(id) {
        const objectParams = removeUndefinedObj(this)
        const a = await BANKACCOUNT.findByIdAndUpdate(id , updateNestedObjectParser(objectParams), { new: true })
        return a
    }
}


module.exports = SellerService