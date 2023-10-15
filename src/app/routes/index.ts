
import express from 'express'
import { UserRouter } from '../modules/users/route'
import { TurfRouter } from '../modules/turf/route'
const userRootRoute = express.Router()



const ModuleRoute = [
    {
        path:'/user',
        routes:UserRouter
    },
    {
        path:'/turf',
        routes:TurfRouter
    }
]

ModuleRoute.forEach(routes=>userRootRoute.use(routes.path,routes.routes))

export default userRootRoute