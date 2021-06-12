const Cart = require('../models/Carts');
const mongoose = require('mongoose');
const Products = require('../models/Product');

/* #region show cart by user id */
exports.getCart = async(req, res) => {

    try {
        let cart_user;
        console.log()
        if (req.user) {
            cart_user = await Cart.findOne({ user: req.user });

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
    console.log(productId)

    try {
        // get the correct cart, either from the db, session, or an empty cart.
        let cart_user = await Cart.findOne({ user: req.user })

        // add the product to the cart
        const product = await Products.findById(productId);

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
        if (req.user) {
            cart_user.user = req.user;
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


// GET: reduce one from an item in the shopping cart
exports.reduceQuantity = async(req, res) => {

    const productId = req.params.id;

    let cart;
    try {
        if (req.user) {
            cart = await Cart.findOne({ user: req.user });

        }
        // find the item with productId
        let itemIndex = cart.items.findIndex((p) => p.productId == productId);

        if (itemIndex > -1) {
            // find the product to find its price

            const product = await Products.findById(productId);
            // if product is found, reduce its qty

            cart.items[itemIndex].qty--;
            cart.items[itemIndex].price -= product.price;
            cart.totalQty--;
            cart.totalCost -= product.price;
            // if the item's qty reaches 0, remove it from the cart
            if (cart.items[itemIndex].qty <= 0) {
                await cart.items.remove({ _id: cart.items[itemIndex] });
            }


            await cart.save();



            res.json(cart)

        }

        res.redirect(req.headers.referer);
    } catch (err) {
        console.log(err.message);
        res.redirect("/");
    }
};

/* #region remove all instances of a single product from the cart*/
exports.removeProductFromCart = async function(req, res) {
    const productId = req.params.id;
    let cart;
    try {
        if (req.user) {
            cart = await Cart.findOne({ user: req.user });

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
        if (req.user) {
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