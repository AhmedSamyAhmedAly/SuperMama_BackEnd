const Order = require('../models/Order')
/** GET ALL ORDERS */  ///Admin privilige
exports.getOrders = async (req, res) => {

    try {
        const orders = await Order.find({});
        await res.json(orders);
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}

/** GET an ORDER By ID */  ///Admin privilige
exports.getOrderById = async (req, res) => {

    try {
        const { id } = req.params;
        const order = await Post.findOne({ id });
        order ? res.send(order) : res.status(404).json({ success: false, message: "No Order exist with this ID" });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}

