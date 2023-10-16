"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = require("../modules/bookings/route");
const route_2 = require("../modules/fields/route");
const route_3 = require("../modules/game-offer/route");
const route_4 = require("../modules/game-type/route");
const route_5 = require("../modules/payment/route");
const route_6 = require("../modules/turf/route");
const route_7 = require("../modules/users/route");
const userRootRoute = express_1.default.Router();
const ModuleRoute = [
    {
        path: '/user',
        routes: route_7.UserRouter
    },
    {
        path: '/game-type',
        routes: route_4.GameTypeRouter
    },
    {
        path: '/field',
        routes: route_2.FieldRouter
    },
    {
        path: '/game-offer',
        routes: route_3.GameOfferRouter
    },
    {
        path: '/booking',
        routes: route_1.BookingRouter
    },
    {
        path: '/payment',
        routes: route_5.PaymentRouter
    },
    {
        path: '/turf',
        routes: route_6.TurfRouter
    }
];
ModuleRoute.forEach(routes => userRootRoute.use(routes.path, routes.routes));
exports.default = userRootRoute;
