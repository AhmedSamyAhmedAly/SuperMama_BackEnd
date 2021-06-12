const express = require('express');
const router = new express.Router();
const CartHelper = require('../routers_helpers/CartRouterHelper');
const jwtauth = require('../middlewares/jwtauth');
const sessionauth = require('../middlewares/sessionauth');
const Cart = require('../models/Carts');
const validate = require('../middlewares/reqBodyValidator');


router.get('/cart', jwtauth, CartHelper.getCart)
router.post('/cart/:id', jwtauth, CartHelper.addToCart)
router.delete('/cart/:id', jwtauth, CartHelper.reduceQuantity)
router.delete('/cart/removeall/:id', jwtauth, CartHelper.removeProductFromCart)

module.exports = router