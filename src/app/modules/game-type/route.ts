import express from 'express'
import validateRequest from '../../middleware/validationMiddleware'
import { GameTypeController } from './controller'
import { GameTypeValidation } from './validation'
import authCheck from '../../middleware/authCheck'
import { RoleEnumType } from '@prisma/client'


const router = express.Router()

router.delete('/delete/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), GameTypeController.deleteGameTypeControler)
router.put('/update/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), GameTypeController.updateGameTypeController)
router.get('/single/:id', GameTypeController.getSingleGameTypeController)
router.post('/create',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN),validateRequest(GameTypeValidation.create), GameTypeController.createController)
router.get('/allGameTypes', GameTypeController.getAllGameTypeController)

export const GameTypeRouter = router