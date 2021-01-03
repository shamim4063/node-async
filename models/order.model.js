import mongoose from "mongoose";
let orderSchema = new mongoose.Schema({
    order_no: Number, //Should be unique
    order_string_date: String,
    products: [{
        product_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
        },
        processed: {
            type: Number,
            default: 0
        },
        quantity: {
            type: Number,
            default: 1
        },
        stock_qty: {
            type: Number,
            default: 0
        },
        allocated_qty: {
            type: Number,
            default: 0
        },
        price: Number,
        name: String,
        image: String,
        send: { type: Boolean, default: false },
        author: String,
        publisher: String,
        purchase_order_created: {
            type: Boolean,
            default: false
        },
        is_out_of_stock: { type: Boolean, default: false },
        arrives_in_stock: { type: Number, default: 0 },
        is_out_of_print: { type: Boolean, default: false },
        is_info_delay: { type: Boolean, default: false },
        info_delayed: { type: Number, default: 0 }
    }],
    has_collection_done: {
        type: Boolean, default: false
    },
    payment_collection: {
        is_full_collected: {
            type: Boolean,
            default: false
        },
        total_paid: {
            type: Number,
            default: 0
        },
        carrier_cost: {
            type: Number,
            default: 0
        },
        collection_charge: {
            type: Number,
            default: 0
        },
        transaction_cost: {
            type: Number,
            default: 0
        },
        due_amount: {
            type: Number,
            default: 0
        },
        tax_amount: {
            type: Number,
            default: 0
        },
        collection_info: [{
            transaction_id: {
                type: String
            },
            transaction_date: {
                type: Date
            },
            transaction_cost: {
                type: Number
            },
            transaction_comment: {
                type: String
            },
            transaction_charge: {
                type: Number, default: 0
            },
            collected_amount: {
                type: Number, default: 0
            },
            collected_at: {
                type: Date,
                default: Date.now
            },
            gateway_ref: {
                type: mongoose.Schema.ObjectId,
                ref: "PaymentGateway"
            },
            collected_by: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            }
        }]
    },

    delivered_at: {
        type: Date
    },
    is_paid: {
        type: Boolean,
        default: false
    },
    paument_method: {
        type: String
    },
    payment_information: { // bKash or SSL payment response
        tran_id: String,
        message: String,
        status: String,
        val_id: String,
        card_type: String,
        store_amount: Number,
        bank_tran_id: String,
        tran_date: Date,
        currency: String,
        card_issuer: String,
        card_brand: String,
        card_issuer_country: String,
        currency_amount: Number
    },
    bkash_invoice_no: { //Extra info for bKash Payment
        type: String
    },
    bkash_payment_id: {//Extra info for bKash Payment
        type: String
    },
    total_price: { type: Number, default: 0 }, // summation of book price
    discount: { type: Number, default: 0 }, //
    delivery_charge: { type: Number, default: 40 },
    wrapping_charge: { type: Number, default: 0 }, //Gift wrap
    wallet_amount: { type: Number, default: 0 }, //Used wallet amount of a Subscriber (This order was made after login)
    voucher_amount: { type: Number },
    wallet_id: { //Used Transaction
        type: mongoose.Schema.ObjectId,
        ref: "Wallet"
    },
    payable_amount: { type: Number, default: 0 },
    has_returened: { type: Boolean, default: false },
    carrier: { // Selected courier
        type: mongoose.Schema.ObjectId,
        ref: "OrderCarrier"
    },
    parcel_wight: { // Total weight of Books
        type: Number,
        default: 0
    },
    total_book: { // Total number of Books
        type: Number,
        default: 0
    },
    is_guest_order: { // if not Logged in then True
        type: Boolean,
        default: false
    },
    delivery_address: Object, // This will have several information 
    payment_address: Object,
    gift_id: { type: mongoose.Schema.ObjectId, ref: "Gift" },
    is_sibling: { type: Boolean, default: false },
    parent_order: { type: mongoose.Schema.ObjectId, ref: "Order" }, // If the order is splitted 
    parent_order_no: { type: Number },  // If the order is splitted 
    is_partially_processed: { type: Boolean, default: false }, //Order may need to be processesd partially because of lacking of books
    is_partial_process_completd: { type: Boolean, default: false },
    partially_processed_siblings: [
        { type: mongoose.Schema.ObjectId, ref: "Order" }
    ], //Partially processed order will be splited into two. Reference of new Order
    order_shipping_wight: { type: Number }, //Final wight of order

    //********Partially return Information
    is_partially_returned: {
        type: Boolean,
        default: false
    },
    returned_items: [{
        product_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
        },
        quantity: Number,
        price: Number,
        name: String
    }],
    returned_items_price: {
        type: Number, default: 0
    },
    returned_by: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    returned_at: {
        type: Date
    },
    return_amount_adjustment: {
        is_adjust: {
            type: Boolean
        },
        adjust_method: {
            type: String
        },
        adjust_by: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    },
    returned_cost: { type: Number, default: 0 },
    packing_cost: { type: Number, default: 0 },
    collection_charge: { type: Number, default: 0 },
    //===========Partially return Information===========

    view: {
        //Is order read by any customer executive after submitting
        is_unread: {
            type: Boolean,
            default: true
        },
        read_at: {
            type: Date
        },
        view_by: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    },
    customer_contact_info: {
        is_received_order: {
            type: Boolean
        },
        other_contact_history: [{
            contact_at: {
                type: Date
            },
            contact_by: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
            contact_note: {
                type: String
            }
        }]
    },
    current_order_status: {
        status_id: {
            type: mongoose.Schema.ObjectId,
            ref: "OrderStatus"
        },
        status_name: String,
        updated_at: {
            type: Date,
            default: Date.now
        },
        updated_by: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        is_print_return: {
            type: Boolean
        }
    },
    performed_order_statuses: [{
        status_id: {
            type: mongoose.Schema.ObjectId,
            ref: "OrderStatus"
        },
        status_name: String,
        updated_at: {
            type: Date,
            default: Date.now
        },
        updated_by: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    }],
    promo_id: {
        type: mongoose.Schema.ObjectId,
        ref: "PromotionalCode"
    },
    referral_code: {
        type: String
    },
    indian_book_available: { type: Boolean, default: false },
    corporate_sale: { type: Boolean, default: false },
    is_emergency: { type: Boolean, default: false },
    emergency_date: {
        type: Date
    },
    ecourier_failed: { //Check whether e-courier API was unsuccessful or not
        type: Boolean
    },
    order_at: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: mongoose.Schema.ObjectId,
        ref: "Subscriber"
    },
    created_from: {
        type: String,
    },
    updated_by: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
});

export default mongoose.model("Order", orderSchema);
