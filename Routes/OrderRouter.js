const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/jwtauth");
const OrderHelper = require("../routers_helpers/OrderRouterHelper")


router.get("/", AuthMiddleware, OrderHelper.getOrders);
router.get("/:id", AuthMiddleware, OrderHelper.getOrderById);
router.post("/", AuthMiddleware, OrderHelper.getOrderById);


module.exports = router;