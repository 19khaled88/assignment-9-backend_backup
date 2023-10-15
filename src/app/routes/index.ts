
import express from 'express'
import { UserRouter } from '../modules/users/route'
import { TurfRouter } from '../modules/turf/route'
import { GameTypeRouter } from '../modules/game-type/route'
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
        path: '/turf',
        routes: TurfRouter
    }
]

ModuleRoute.forEach(routes => userRootRoute.use(routes.path, routes.routes))

export default userRootRoute