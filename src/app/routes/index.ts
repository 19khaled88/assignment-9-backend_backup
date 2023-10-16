
import express from 'express'
import { BookingRouter } from '../modules/bookings/route'
import { FieldRouter } from '../modules/fields/route'
import { GameOfferRouter } from '../modules/game-offer/route'
import { GameTypeRouter } from '../modules/game-type/route'
import { PaymentRouter } from '../modules/payment/route'
import { TurfRouter } from '../modules/turf/route'
import { UserRouter } from '../modules/users/route'
const userRootRoute = express.Router()



const ModuleRoute = [
    {
        path: '/user',
        routes: UserRouter
    },
    {
        path: '/game-type',
        routes: GameTypeRouter
    },
    {
        path: '/field',
        routes: FieldRouter
    },
    {
        path: '/game-offer',
        routes: GameOfferRouter
    },
    {
        path: '/booking',
        routes: BookingRouter
    },
    {
        path: '/payment',
        routes: PaymentRouter
    },
    {
        path: '/turf',
        routes: TurfRouter
    }
]

ModuleRoute.forEach(routes => userRootRoute.use(routes.path, routes.routes))

export default userRootRoute