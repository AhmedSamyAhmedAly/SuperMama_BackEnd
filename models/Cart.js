const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
        },
        qty: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            default: 0,
        },
        title: {
            type: String,
        },

    }, ],
    totalQty: {
        type: Number,
        default: 0,
        required: true,
    },
    totalCost: {
        type: Number,
        default: 0,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const cart = mongoose.model("Cart", cartSchema);
module.exports = cart;