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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameOfferService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createGameOfferService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // const isExist = await transactionClient.gameOffer.findFirst({
        // 	where: {
        // 		code: data.code
        // 	}
        // })
        // if (isExist) {
        // 	throw new ApiError(400, 'A field with this code already created')
        // }
        const result = yield transactionClient.gameOffer.create({
            data: data,
        });
        const newGameOffer = yield transactionClient.gameOffer.findFirst({
            where: {
                id: result.id
            },
            select: {
                offer_time: true,
                offer_price: true,
                turfId: true,
                gameTypeId: true,
                fieldId: true
            }
        });
        return newGameOffer;
    }));
    return result;
});
const getAllGameOffers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.gameOffer.findMany({
        select: {
            id: true,
            offer_time: true,
            offer_price: true,
            turfId: true,
            gameTypeId: true,
            fieldId: true,
        },
    });
    return result;
});
const getSingleGameOffer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.gameOffer.findFirstOrThrow({
        where: {
            id: id,
        },
        select: {
            id: true,
            offer_time: true,
            offer_price: true,
            turfId: true,
            gameTypeId: true,
            fieldId: true,
        }
    });
    return isExist;
});
const deleteGameOffer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield prisma.gameOffer.delete({
        where: {
            id: id,
        },
    });
    return isDeleted;
});
const updateGameOffer = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield prisma.gameOffer.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return isUpdated;
});
exports.GameOfferService = {
    createGameOfferService,
    getAllGameOffers,
    getSingleGameOffer,
    deleteGameOffer,
    updateGameOffer
};
