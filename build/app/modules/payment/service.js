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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const client_1 = require("@prisma/client");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const interfaces_1 = require("./interfaces");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma = new client_1.PrismaClient();
const createPaymentService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const isExist = yield transactionClient.booking.findFirst({
            where: {
                id: data.bookingId
            }
        });
        if (!isExist) {
            throw new apiError_1.default(400, 'No booking found for this id!');
        }
        const result = yield transactionClient.payment.create({
            data: data,
        });
        yield transactionClient.booking.update({
            where: {
                id: data.bookingId
            },
            data: {
                payment_status: client_1.StatusEnumType.EXECUTED
            }
        });
        const newPayment = yield transactionClient.payment.findFirst({
            where: {
                id: result.id
            },
            select: {
                bookingId: true,
            }
        });
        return newPayment;
    }));
    return result;
});
const getAllPayment = (paginatinOptions, filterOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filterOptions, filterData = __rest(filterOptions, ["searchTerm"]);
    const { limit, page, skip } = paginationHelper_1.paginationHelper.calculatePagination(paginatinOptions);
    let andConditions = [];
    //searching code
    if (searchTerm) {
        andConditions.push({
            OR: interfaces_1.payment_search_fields_constant.map(field => {
                return {
                    [field]: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    },
                };
            }),
        });
    }
    //filtering code
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        });
    }
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma.payment.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: paginatinOptions.sortOrder && paginatinOptions.sortBy ? {
            [paginatinOptions.sortBy]: paginatinOptions.sortOrder
        } : {},
        select: {
            id: true,
            bookingId: true,
        },
    });
    const total = yield prisma.payment.count();
    return {
        meta: {
            page,
            limit,
            total
        }, data: result
    };
});
const getSinglePayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.payment.findFirstOrThrow({
        where: {
            id: id,
        },
        select: {
            id: true,
            bookingId: true
        }
    });
    return isExist;
});
const deletePayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield prisma.payment.delete({
        where: {
            id: id,
        },
    });
    return isDeleted;
});
const updatePayment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield prisma.payment.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return isUpdated;
});
exports.PaymentService = {
    createPaymentService,
    getAllPayment,
    getSinglePayment,
    deletePayment,
    updatePayment
};
