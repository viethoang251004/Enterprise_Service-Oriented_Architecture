const DOCUMENT_NAME = 'Seller'
const COLLECTION_NAME = 'Sellers';
const { model, Schema, Types } = require('mongoose'); 

const sellerSchema = new Schema({
    email:{ type:String, required:true, unique:true },
    fullname:{ type:String, default: null },
    password:{ type:String },
    phone:{ type:String, default: null },
    address:{ type:String, default: null },
    ward: { type:String, default: null },
    district: { type:String, default: null },
    province: { type:String, default: null },
    roles: { type: Array, default: [] }, //  quyền truy cập vào tài nguyên hệ thống
    last_access: { type: Date, default: null },
    /*
        pending: chờ thêm thông tin về ngân hàng, giao hàng nhanh (option: Đã có tài khoản giao hàng nhanh)
    */
    status: { type: String, default: 'pending' , enum: ['pending','active', 'closed']},
    // ghnAcc: { type: Schema.Types.Mixed },
    // bankAcc: { type: Schema.Types.Mixed }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

const GNH_DEFAULT_TOKEN = process.env.GHN_TOKEN
const GNH_DEFAULT_CLIENT = process.env.GHN_CLIENT

const ghnAccSchema = new Schema({
    seller_id : { type: Schema.Types.ObjectId, ref: 'Seller' }, 
    ghn_shop_id: { type:String, default: null },
    ghn_client_id: { type:String, default: GNH_DEFAULT_CLIENT },
    ghn_token_id: { type:String, default:  GNH_DEFAULT_TOKEN },
}, {
    timestamps: true,
    collection: 'ghnAcc'
});

const bankAccountSchema = new Schema({
    seller_id: { type: Schema.Types.ObjectId, ref: 'Seller' },
    bank_name: { type:String, default: null },
    account_name: { type:String, default: null},
    account_number: { type:String, default:null },
}, {
    timestamps: true,
    collection: 'BankAccount'
})

module.exports = {
    SELLER: model(DOCUMENT_NAME, sellerSchema),
    GHNACC: model('GHNAcc', ghnAccSchema),
    BANKACCOUNT: model('BankAccount', bankAccountSchema)
} 