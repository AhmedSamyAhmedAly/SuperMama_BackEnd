const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({ 
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    total_price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['accepted', 'rejected', 'pending'],
        default: 'pending'
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        quantity: {
            type: Number
        }
    }]

}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;