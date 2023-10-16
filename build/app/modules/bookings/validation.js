"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        start_time: zod_1.z.string({
            required_error: 'Game start time is required or field not match'
        }),
        end_time: zod_1.z.string({
            required_error: 'Game closing time is required or field not match'
        }),
        gameOfferId: zod_1.z.string({
            required_error: 'Game offer ID is required or field not match'
        }),
        turfId: zod_1.z.string({
            required_error: 'Turf ID is required or field not match'
        }),
        fieldId: zod_1.z.string({
            required_error: 'Field ID is required or field not match'
        }),
        gameTypeId: zod_1.z.string({
            required_error: 'Game type ID is required or field not match'
        }),
        userId: zod_1.z.string({
            required_error: 'User Id is required or field not match'
        })
    })
});
exports.BookingValidation = {
    create
};
