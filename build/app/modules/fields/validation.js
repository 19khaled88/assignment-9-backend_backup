"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        code: zod_1.z.string({
            required_error: 'Field code is required or field not match'
        }),
        turfId: zod_1.z.string({
            required_error: 'Turf ID is required or field not match'
        }),
        size: zod_1.z.number({
            required_error: 'Field size is required or field not match'
        })
    })
});
exports.FieldValidation = {
    create
};
