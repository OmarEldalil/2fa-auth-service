"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCreateOrderSchema = void 0;
var zod_1 = require("zod");
exports.postCreateOrderSchema = zod_1.z.object({
    customerId: zod_1.z.string(),
    quantity: zod_1.z.number().int().positive(),
    price: zod_1.z.number().int().positive(),
});
