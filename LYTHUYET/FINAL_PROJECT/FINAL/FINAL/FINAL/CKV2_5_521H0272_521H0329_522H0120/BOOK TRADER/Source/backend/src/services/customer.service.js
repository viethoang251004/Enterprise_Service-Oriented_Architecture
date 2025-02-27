
const { CUSTOMER } = require('../models/customer.model')
const { sendEmailSignUp } = require('./email.service')
const bcrypt = require('bcrypt')

const Roles = {
    ADMIN: '0000',
    SELLER: '0001',
    CUSTOMER: '0002'
}

class CustomerService {
    static signup = async ({ email }) => {
        // check exists email
        const customer = await CUSTOMER.findOne({ email }).lean()
        if (customer) return { 
            message: "existed email",
            metadata: 0
        }

        // mật khẩu tạm thời là email
        const hashPass = await bcrypt.hash(email, 10)
        
        const s = await new Customer({email: email, password: hashPass}).createCustomer()

        // send email
        const result = await sendEmailSignUp({email})
        
        return result  
    }
}

class Customer {
    constructor({
        email, fullname, password, phone, address, ward, district, province , roles, last_access, status, slug
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
        this.status = status,
        this.slug = slug

    }

    async createCustomer() {
        const s = await CUSTOMER.create(this);
        return s
    }

}

module.exports = CustomerService