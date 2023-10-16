"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        bookingId: zod_1.z.string({
            required_error: 'Booking ID is required or field not match'
        })
    })
});
exports.PaymentValidation = {
    create
};
