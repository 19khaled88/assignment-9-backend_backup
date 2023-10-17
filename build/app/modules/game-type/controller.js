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
exports.GameTypeController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const service_1 = require("./service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const paginationFields_1 = require("../../../shared/paginationFields");
const createController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_1.GameTypeService.createGameTypeService(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Game type created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllGameTypeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterOptions = (0, pick_1.default)(req.query, ['searchTerm', 'name', 'numberOfPalyers']);
    const paginatinOptions = (0, pick_1.default)(req.query, paginationFields_1.paginationFields);
    const result = yield service_1.GameTypeService.getAllGameType(paginatinOptions, filterOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Game type retrieved successfully",
        data: result,
    });
});
const getSingleGameTypeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_1.GameTypeService.getSingleGameType(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Game type fetched successfully",
        data: result,
    });
});
const updateGameTypeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdate = yield service_1.GameTypeService.updateGameType(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "game type updated successfully",
        data: isUpdate,
    });
});
const deleteGameTypeControler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield service_1.GameTypeService.deleteGameType(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Turf deleted successfully",
        data: isDeleted,
    });
});
exports.GameTypeController = {
    createController,
    getAllGameTypeController,
    getSingleGameTypeController,
    updateGameTypeController,
    deleteGameTypeControler
};
