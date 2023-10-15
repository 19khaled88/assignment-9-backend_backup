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
exports.BookingService = void 0;
const client_1 = require("@prisma/client");
// import ApiError from "../../../errors/apiError";
const prisma = new client_1.PrismaClient();
const createBookingService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // const isExist = await transactionClient.booking.findFirst({
        // 	where: {
        // 	}
        // })
        // if (isExist) {
        // 	throw new ApiError(400, 'A field with this code already created')
        // }
        const result = yield transactionClient.booking.create({
            data: data,
        });
        const newGameOffer = yield transactionClient.booking.findFirst({
            where: {
                id: result.id
            },
            select: {
                start_time: true,
                end_time: true,
                gameOfferId: true,
                userId: true
            }
        });
        return newGameOffer;
    }));
    return result;
});
const getAllBookingService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.booking.findMany({
        select: {
            id: true,
            start_time: true,
            end_time: true,
            gameOfferId: true,
            userId: true
        },
    });
    return result;
});
const getSingleBookingService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.booking.findFirstOrThrow({
        where: {
            id: id,
        },
        select: {
            id: true,
            start_time: true,
            end_time: true,
            gameOfferId: true,
            userId: true
        }
    });
    return isExist;
});
const deleteBookingService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield prisma.booking.delete({
        where: {
            id: id,
        },
    });
    return isDeleted;
});
const updateBookingService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield prisma.booking.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return isUpdated;
});
exports.BookingService = {
    createBookingService,
    getAllBookingService,
    getSingleBookingService,
    deleteBookingService,
    updateBookingService
};
