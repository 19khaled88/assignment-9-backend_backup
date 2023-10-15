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
exports.FieldService = void 0;
const client_1 = require("@prisma/client");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const prisma = new client_1.PrismaClient();
const createFieldService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const isExist = yield transactionClient.field.findFirst({
            where: {
                code: data.code
            }
        });
        if (isExist) {
            throw new apiError_1.default(400, 'A field with this code already created');
        }
        const result = yield transactionClient.field.create({
            data: data,
        });
        const newField = yield transactionClient.field.findFirst({
            where: {
                id: result.id
            },
            select: {
                code: true,
                size: true,
                turfId: true,
                gameOffers: true
            }
        });
        return newField;
    }));
    return result;
});
const getAllFields = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.field.findMany({
        select: {
            id: true,
            code: true,
            size: true,
            turfId: true,
            gameOffers: true
        },
    });
    return result;
});
const getSingleField = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.field.findFirstOrThrow({
        where: {
            id: id,
        },
        select: {
            id: true,
            code: true,
            turfId: true,
            size: true,
            gameOffers: true
        }
    });
    return isExist;
});
const deleteField = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield prisma.field.delete({
        where: {
            id: id,
        },
    });
    return isDeleted;
});
const updateField = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield prisma.field.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return isUpdated;
});
exports.FieldService = {
    createFieldService,
    getAllFields,
    getSingleField,
    updateField,
    deleteField
};
