import express from 'express'
import validateRequest from '../../middleware/validationMiddleware'
import { GameOfferController } from './controller'
import { GameOfferValidation } from './validation'


const router = express.Router()

router.delete('/delete/:id', GameOfferController.deleteGameOfferController)
router.put('/update/:id', GameOfferController.updateGameOfferController)
router.get('/single/:id', GameOfferController.getSingleGameOfferController)
router.post('/create', validateRequest(GameOfferValidation.create), GameOfferController.createController)
router.get('/allOfferdGames', GameOfferController.getAllGameOfferController)

export const GameOfferRouter = router