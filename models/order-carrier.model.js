
import mongoose from 'mongoose';

let OrderCarrierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    code: {
        type: String
    },
    address: {
        type: String
    },

    phone: {
        type: String
    },

    email: {
        type: String
    },

    is_enabled: {
        type: Boolean, default: 1
    },
    created_at: {
        type: Date, default: Date.now
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    updated_at: {
        type: Date //, default: Date.now
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
});

export default mongoose.model('OrderCarrier', OrderCarrierSchema);
