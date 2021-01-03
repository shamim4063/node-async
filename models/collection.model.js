import mongoose from 'mongoose';


let paymentCollectionSchema = new mongoose.Schema({
    deposit_date: {
        type: Date
    },
    order_no: {
        type: Number
    },
    order_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Order'
    },
    order_date: {
        type: Date
    },
    courier_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'OrderCarrier'
    },
    challan_amount: {
        type: Number,
        default: 0
    },
    collection_charge: {
        type: Number,
        default: 0
    },
    courier_charge_in_advance:{
        type: Number,
        default: 0
    },
    courier_charge: {
        type: Number,
        default: 0
    },
    delivery_charge: {
        type: Number,
        default: 0
    },
    net_sales_amount: {
        type: Number,
        default: 0
    },
    deposit_to_bank: {
        type: Number,
        default: 0
    },
    wallet_pay: {
        type: Number,
        default: 0
    },
    packing_cost: {
        type: Number,
        default: 0
    },
    total_amount: {
        type: Number,
        default: 0
    },
    promotion: {
        type: Number,
        default: 0
    },
    return_amount: {
        type: Number,
        default: 0
    },
    return_charge: {
        type: Number,
        default: 0
    },
    sales_discount: {
        type: Number,
        default: 0
    },
    bkash: {
        type: Number,
        default: 0
    },
    bkash_charge: {
        type: Number,
        default: 0
    },
    ssl: {
        type: Number,
        default: 0
    },
    cash: {
        type: Number,
        default: 0
    },
    ssl_charge: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
})

export default mongoose.model('PaymentCollection', paymentCollectionSchema);
