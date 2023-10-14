"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlePrismaClientKnowRequestError = (error) => {
    var _a, _b;
    let errors = [];
    let message = "";
    let statusCode = 400;
    if (error.code = 'P2025') {
        message = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.cause;
        errors = [
            {
                path: "",
                message: error.message
            }
        ];
    }
    else if (error.code = 'P2002') {
        message = (_b = error.meta) === null || _b === void 0 ? void 0 : _b.cause;
        errors = [
            {
                path: "",
                message: error.message
            }
        ];
    }
    else {
        message = 'Record not found!';
        errors = [
            {
                path: "",
                message: 'Record not found'
            }
        ];
    }
    return {
        statusCode,
        message,
        errorMessages: errors
    };
};
exports.default = handlePrismaClientKnowRequestError;
