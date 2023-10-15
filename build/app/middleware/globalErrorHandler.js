"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const config_1 = __importDefault(require("../../config"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const castError_1 = __importDefault(require("../../errors/castError"));
const prismaClientKnownRequestError_1 = __importDefault(require("../../errors/prismaClientKnownRequestError"));
const prismaValidationError_1 = __importDefault(require("../../errors/prismaValidationError"));
const validationError_1 = __importDefault(require("../../errors/validationError"));
const zodError_1 = __importDefault(require("../../errors/zodError"));
const globalErrorHandler = (err, req, res, next) => {
    // console.log('total error : ',err)
    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages = [];
    if (err.name === 'ValidationError') {
        const simplifiedError = (0, validationError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (err instanceof zod_1.ZodError
    // err.name === 'ZodError'
    ) {
        const simplifiedError = (0, zodError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (err.name === 'CastError') {
        const simplifiedError = (0, castError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        const simplifiedError = (0, prismaValidationError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        const simplifiedError = (0, prismaClientKnownRequestError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (err instanceof apiError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message) ? [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message
            }
        ] : [];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message
                }
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.env !== 'production' ? err === null || err === void 0 ? void 0 : err.stack : undefined
    });
};
exports.default = globalErrorHandler;
