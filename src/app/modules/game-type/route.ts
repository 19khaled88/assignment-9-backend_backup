import express from 'express'
import validateRequest from '../../middleware/validationMiddleware'
import { GameTypeController } from './controller'
import { GameTypeValidation } from './validation'


const router = express.Router()

router.delete('/delete/:id', GameTypeController.deleteGameTypeControler)
router.put('/update/:id', GameTypeController.updateGameTypeController)
router.get('/single/:id', GameTypeController.getSingleGameTypeController)
router.post('/create',validateRequest(GameTypeValidation.create), GameTypeController.createController)
router.get('/allGameType', GameTypeController.getAllGameTypeController)

export const GameTypeRouter = router