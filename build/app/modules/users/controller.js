"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const service_1 = require("./service");
const signUpController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_1.UserService.signUpServices(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "User created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const signInController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_1.UserService.signInServices(req.body);
        res.send({
            success: true,
            statusCode: 200,
            message: "User signin successfully",
            token: result === null || result === void 0 ? void 0 : result.token,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            (0, sendResponse_1.default)(res, {
                statusCode: http_status_1.default.UNAUTHORIZED,
                success: false,
                message: "User signin unsuccessful",
                data: error.message
            });
        }
        else {
            (0, sendResponse_1.default)(res, {
                statusCode: http_status_1.default.UNAUTHORIZED,
                success: false,
                message: "User signin unsuccessful",
                data: "unknow error"
            });
        }
    }
});
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_1.UserService.getAllUsers();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
});
const getSingleUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_1.UserService.getSingleUser(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User getched successfully",
        data: result,
    });
});
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdate = yield service_1.UserService.updateUser(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User updated successfully",
        data: isUpdate,
    });
});
const deleteUserControler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield service_1.UserService.deleteUser(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Uers deleted successfully",
        data: isDeleted,
    });
});
exports.UserController = {
    signUpController,
    signInController,
    getAllUsersController,
    getSingleUserController,
    updateUserController,
    deleteUserControler,
};
