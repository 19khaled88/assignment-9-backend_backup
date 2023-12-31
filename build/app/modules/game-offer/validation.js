"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameOfferValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        price_per_hour: zod_1.z.number({
            required_error: 'Time is required or field not match'
        }),
        gameTypeId: zod_1.z.string({
            required_error: 'Game type is required or field not match'
        }),
        fieldId: zod_1.z.string({
            required_error: 'Field ID is required or field not match'
        }),
        turfId: zod_1.z.string({
            required_error: 'Turf Id is required or field not match'
        })
    })
});
exports.GameOfferValidation = {
    create
};
