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
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = require("../../../utils/token");
const prisma = new client_1.PrismaClient();
const signUpServices = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(data.password, 12);
    data.password = hashedPassword;
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield prisma.user.create({
            data: data,
        });
        const newUser = yield transactionClient.user.findFirst({
            where: {
                id: result.id
            },
            select: {
                id: true,
                name: true,
                role: true,
                email: true,
                contactNo: true,
                address: true,
                location: true
            }
        });
        return newUser;
    }));
    return result;
});
const signInServices = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.user.findFirst({
        where: {
            email: data.email,
        },
    });
    if (isExist === null) {
        throw new Error('This user does not exist');
    }
    if (isExist !== null &&
        data.password !== undefined &&
        (yield bcrypt_1.default.compare(data.password, isExist.password))) {
        const access_token = (0, token_1.signJwt)({ role: isExist.role, userId: isExist.id }, { expiresIn: "2h" });
        return { token: access_token };
    }
    throw new Error('This user not found');
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findMany({
        select: {
            id: true,
            name: true,
            role: true,
            email: true,
            contactNo: true,
            address: true,
            location: true,
            bookings: true
        },
    });
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.user.findFirst({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            role: true,
            email: true,
            contactNo: true,
            address: true,
            location: true,
            bookings: true
        }
    });
    return isExist;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield prisma.user.delete({
        where: {
            id: id,
        },
    });
    return isDeleted;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield prisma.user.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return isUpdated;
});
exports.UserService = {
    signUpServices,
    signInServices,
    getAllUsers,
    updateUser,
    deleteUser,
    getSingleUser
};
