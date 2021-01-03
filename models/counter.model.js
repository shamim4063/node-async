import mongoose from 'mongoose';

let counterSchema = new mongoose.Schema({
    name: {
        type: String
    },
    seq: {
        type: Number, default: 0
    }
})

export default mongoose.model('Counter', counterSchema);