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
exports.GameTypeService = void 0;
const client_1 = require("@prisma/client");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const prisma = new client_1.PrismaClient();
const createGameTypeService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const isExist = yield transactionClient.gameType.findFirst({
            where: {
                name: data.name
            }
        });
        if (isExist) {
            throw new apiError_1.default(400, 'A Game type with this name already created');
        }
        const result = yield transactionClient.gameType.create({
            data: data,
        });
        const newGame = yield transactionClient.gameType.findFirst({
            where: {
                id: result.id
            },
            select: {
                name: true,
                price: true,
                numberOfPalyers: true
            }
        });
        return newGame;
    }));
    return result;
});
const getAllGameType = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.gameType.findMany({
        select: {
            id: true,
            name: true,
            numberOfPalyers: true,
            price: true,
            GameOffers: true
        },
    });
    return result;
});
const getSingleGameType = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.gameType.findFirst({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            numberOfPalyers: true,
            price: true,
            GameOffers: true
        }
    });
    return isExist;
});
const deleteGameType = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield prisma.gameType.delete({
        where: {
            id: id,
        },
    });
    return isDeleted;
});
const updateGameType = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield prisma.gameType.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return isUpdated;
});
exports.GameTypeService = {
    createGameTypeService,
    getAllGameType,
    getSingleGameType,
    deleteGameType,
    updateGameType
};
