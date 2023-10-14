"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const ROLE = ["USER", "ADMIN", "SUPER_ADMIN"];
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required or field not match'
        }),
        email: zod_1.z.string({
            required_error: 'Email is required or field not match'
        }),
        password: zod_1.z.string({
            required_error: 'Password is required or field not match'
        }),
        role: zod_1.z.enum(ROLE).optional(),
        contactNo: zod_1.z.string({
            required_error: 'ContactNo is required or field not match'
        }),
        address: zod_1.z.string({
            required_error: 'Address is required or field not match'
        }),
        location: zod_1.z.string({
            required_error: 'Location is required or field not match'
        })
    })
});
exports.UserValidation = {
    create
};
