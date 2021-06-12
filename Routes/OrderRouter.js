const express = require("express");
const router = express.Router();
const jwtauth = require("../middlewares/jwtauth");
const sessionauth = require("../middlewares/sessionauth");
const OrderHelper = require("../routers_helpers/OrderRouterHelper")
const validator = require('../middlewares/reqBodyValidator')


router.get("/orders", jwtauth, sessionauth, OrderHelper.getOrders);

router.get("/orders/:id", jwtauth, sessionauth, OrderHelper.getOrderById);

router.post('/orders', jwtauth, sessionauth, validator.NewOrderValidationRules(), validator.validation , OrderHelper.addNewOrder)

router.patch('/orders/:id/status', jwtauth, sessionauth, OrderHelper.updateOrderStatus)

router.delete('/orders/:id', jwtauth, sessionauth, OrderHelper.deleteOrder)

module.exports = router;