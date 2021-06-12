const express = require('express');
const router = new express.Router();
const CartHelper = require('../routers_helpers/CartRouterHelper');
const jwtauth = require('../middlewares/jwtauth');
const sessionauth = require('../middlewares/sessionauth');
const Cart = require('../models/Cart');
const validate = require('../middlewares/reqBodyValidator');


router.get('/cart', jwtauth, CartHelper.getCart)
router.post('/cart/:id', jwtauth, CartHelper.addToCart)
    // router.delete('')

module.exports = router