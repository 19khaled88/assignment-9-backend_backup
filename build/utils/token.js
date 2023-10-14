"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const signJwt = (payload, options = {}) => {
    return jsonwebtoken_1.default.sign(payload, config_1.default.accessTokenKey, Object.assign({}, (options && options)));
};
exports.signJwt = signJwt;
// process.env.ACCESS_TOKEN_KEY
const verifyJwt = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, config_1.default.accessTokenKey);
    }
    catch (error) {
        throw new Error('Invalid token found');
    }
};
exports.verifyJwt = verifyJwt;
