const Cart = require('../models/Cart');
const mongoose = require('mongoose');

/* #region show cart by user id */
exports.getCart = async(req, res) => {

    try {
        let cart_user;
        if (req.userId) {
            cart_user = await Cart.findOne({ user: req.userId });
            res.json(cart_user)
        } else return res.status(404).send("something went wrong");
    } catch (err) {
        res.send(err);
    }
};
/* #endregion */


/* #region add a product to the shopping cart */

exports.addToCart = async(req, res) => {


    const productId = req.params.id;

    try {
        // get the correct cart, either from the db, session, or an empty cart.
        let cart_user = await Cart.findOne({ user: req.userId })

        // add the product to the cart
        const product = await Product.findById(productId);

        const itemIndex = cart_user.items.findIndex((p) => p.productId == productId);

        if (itemIndex > -1) {
            // if product exists in the cart, update the quantity
            cart_user.items[itemIndex].qty++;
            cart_user.items[itemIndex].price = cart_user.items[itemIndex].qty * product.price;
            cart_user.totalQty++;
            cart_user.totalCost += product.price;

        } else {
            // if product does not exists in cart, find it in the db to retrieve its price and add new item
            cart_user.items.push({
                productId: productId,
                qty: 1,
                price: product.price,
                title: product.title
            });
            cart_user.totalQty++;
            cart_user.totalCost += product.price;
        }


        // if the user is logged in, store the user's id and save cart to the db
        if (req.userId) {
            cart_user.user = req.userId;
            await cart_user.save();
        }
        //   req.session.cart = cart;
        // res.json({ message: "item added to cart" })
        res.json(cart_user)


    } catch (err) {
        console.log(err.message);
        res.redirect("/");
    }
};

/* #endregion */

/* #region remove all instances of a single product from the cart*/
exports.removeProductFromCart = async function(req, res) {
    const productId = req.params.id;
    let cart;
    try {
        if (req.userId) {
            cart = await Cart.findOne({ user: req.userId });

        } else if (req.session.cart) {
            cart = await new Cart(req.session.cart);
        }
        //fnd the item with productId
        let itemIndex = cart.items.findIndex((p) => p.productId == productId);

        if (itemIndex > -1) {
            //find the product to find its price
            cart.totalQty -= cart.items[itemIndex].qty;
            cart.totalCost -= cart.items[itemIndex].price;
            await cart.items.remove({ _id: cart.items[itemIndex] });
            res.json(cart);
        }
        //save the cart it only if user is logged in
        if (req.userId) {
            await cart.save();
        }
        res.json({ cartInfo: cart })
        res.redirect(req.headers.referer);
    } catch (err) {
        console.log(err.message);
        res.redirect("/");
    }
};

/* #endregion */