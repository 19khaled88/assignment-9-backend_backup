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
exports.FieldController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const service_1 = require("./service");
const createController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_1.FieldService.createFieldService(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Field created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllFieldController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_1.FieldService.getAllFields();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Fields retrieved successfully",
        data: result,
    });
});
const getSingleFieldController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_1.FieldService.getSingleField(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Field fetched successfully",
        data: result,
    });
});
const updateFieldController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdate = yield service_1.FieldService.updateField(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Field for given ID updated successfully",
        data: isUpdate,
    });
});
const deleteFieldController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield service_1.FieldService.deleteField(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Field for given Id deleted successfully",
        data: isDeleted,
    });
});
exports.FieldController = {
    createController,
    getAllFieldController,
    getSingleFieldController,
    updateFieldController,
    deleteFieldController
};
