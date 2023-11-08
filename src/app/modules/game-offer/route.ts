import { RoleEnumType } from '@prisma/client'
import express from 'express'
import authCheck from '../../middleware/authCheck'
import validateRequest from '../../middleware/validationMiddleware'
import { GameOfferController } from './controller'
import { GameOfferValidation } from './validation'


const router = express.Router()

router.delete('/delete/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), GameOfferController.deleteGameOfferController)
router.put('/update/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), GameOfferController.updateGameOfferController)
router.get('/single/:id', GameOfferController.getSingleGameOfferController)
router.post('/create',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), validateRequest(GameOfferValidation.create), GameOfferController.createController)
router.get('/allOfferdGames', GameOfferController.getAllGameOfferController)

export const GameOfferRouter = router