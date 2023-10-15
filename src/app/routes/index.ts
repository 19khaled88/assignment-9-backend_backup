
import express from 'express'
import { UserRouter } from '../modules/users/route'
import { TurfRouter } from '../modules/turf/route'
import { GameTypeRouter } from '../modules/game-type/route'
import { FieldRouter } from '../modules/fields/route'
import { GameOfferRouter } from '../modules/game-offer/route'
import { BookingRouter } from '../modules/bookings/route'
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
        path: '/turf',
        routes: TurfRouter
    }
]

ModuleRoute.forEach(routes => userRootRoute.use(routes.path, routes.routes))

export default userRootRoute