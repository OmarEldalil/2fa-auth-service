"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
var express_1 = require("express");
var orderController_1 = require("../controllers/orderController");
var orderRouter = (0, express_1.Router)();
exports.orderRouter = orderRouter;
orderRouter.post("/", orderController_1.createOrder);
