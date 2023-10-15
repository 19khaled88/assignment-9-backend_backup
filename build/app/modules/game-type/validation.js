"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameTypeValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Game name is required or field not match'
        }),
        numberOfPalyers: zod_1.z.number({
            required_error: 'Number of players is required or field not match'
        })
    })
});
exports.GameTypeValidation = {
    create
};
