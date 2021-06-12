const Order = require('../models/Order')
const User = require('../models/User')


/** GET ALL Orders OR User Own ORDERs */  ///User privilige ///Admin privilige
exports.getOrders = async (req, res) => {
    try {
        const user_id = req.user._id;
        const user = await User.findById( user_id )
        ///find order
        let orders
        if (user.role == "user")
            orders = await Order.find({ user_id });
        else
            orders = await Order.find({});
        await res.json(orders);
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}

/** GET an ORDER By ID */  ///Admin privilige
exports.getOrderById = async (req, res) => {

    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        order ? res.send(order) : res.status(404).json({ success: false, message: "No Order exist with this ID" });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}


/** POST New ORDER */  ///User privilige
exports.addNewOrder = async (req, res) => {
    try {
        ////prepare order obj
        req.body.user_id = req.user._id;
        console.log(req.body)
        const order = await Order.create(req.body);
        ////prepare response
        const obj = {
            success: true,
            message: "order was placed succesfully",
            order,
        };
        ////client side response
        res.send(obj);
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}


/** DELETE User Own ORDER */  /// User privilige /// Admin privilige
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user._id;
        const user = await User.findById( user_id )
        ///find order
        let order
        if (user.role == "user")
            order = await Order.findOne({ _id:id, user_id });
        else
            order = await Order.findOne({ _id:id });
        ////check if exist and status not pending
        if (order && order.status == "pending") {
            await Order.deleteOne({ _id:id, user_id });
            res.json({ success: true, message: "order deleted successfully" });
        
        } else throw new Error("order not found or already on its way");
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}

/*** PATCH Order Status */   /// Admin privilige
exports.updateOrderStatus = async (req, res) => {
    try {
        const {id} = req.params
        const user_id = req.user;
        const { status } = req.body;
        const user = await User.findById( user_id)
        if (user.role !== "user"){
            const order = await Order.updateOne({ id }, { status });
            const obj = {
                success: true,
                message: "order status was edited succesfully",
                order
            }
            res.send(obj)
        }else throw new Error("not authorized as admin");
    } catch (err) {
        res.json({ success: false, message: err.message });

    }
}




