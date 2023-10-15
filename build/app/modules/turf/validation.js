"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurfValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required or field not match'
        }),
        location: zod_1.z.string({
            required_error: 'Location is required or field not match'
        }),
        owner: zod_1.z.string({
            required_error: 'Owner is required or field not match'
        })
    })
});
exports.TurfValidation = {
    create
};
