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
exports.TurfController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const service_1 = require("./service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const paginationFields_1 = require("../../../shared/paginationFields");
const createController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_1.TurfService.createTurfService(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Turf created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllTurfsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterOptions = (0, pick_1.default)(req.query, ['name', 'location', 'owner']);
    const paginationOptions = (0, pick_1.default)(req.query, paginationFields_1.paginationFields);
    const result = yield service_1.TurfService.getAllTurfs(paginationOptions, filterOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Turfs retrieved successfully",
        data: result,
    });
});
const getSingleTurfController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_1.TurfService.getSingleTurf(req.params.id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Turf fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateTurfController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdate = yield service_1.TurfService.updateTurf(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Turf updated successfully",
        data: isUpdate,
    });
});
const deleteTurfControler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isDeleted = yield service_1.TurfService.deleteTurf(req.params.id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Turf deleted successfully",
            data: isDeleted,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.TurfController = {
    createController,
    getAllTurfsController,
    getSingleTurfController,
    updateTurfController,
    deleteTurfControler
};
