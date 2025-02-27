'use strict'

const DOCUMENT_NAME = 'customer'
const COLLECTION_NAME = 'customers';
const { model, Schema, Types } = require('mongoose'); 

const customerSchema = new Schema({
    fullname:{ type:String },
    email:{ type:String, unique:true },
    password:{ type:String },
    phone:{ type:String, default: null },
    address:{ type:String, default: null},
    ward:{ type:String , default: null},
    district:{ type:String, default: null},
    province:{ type:String , default: null},
    roles: { type: Array, default: [] }, //  quyền truy cập vào tài nguyên hệ thống
    last_access: { type: Date, default: null },
    status: { type: String, enum: ['Active', 'Closed']},
    slug: { type: String, default: null },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})


//Export the model
module.exports = {
    CUSTOMER: model(DOCUMENT_NAME, customerSchema),
} 