"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelper = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (payload, secret, expiresTime) => {
    return jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: expiresTime
    });
};
const verify = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.jwtHelper = {
    createToken, verify
};
