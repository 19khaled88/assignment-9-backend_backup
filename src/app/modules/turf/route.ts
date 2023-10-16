import express from 'express'
import validateRequest from '../../middleware/validationMiddleware'
import { TurfController } from './controller'
import { TurfValidation } from './validation'

const router = express.Router()

router.delete('/delete/:id', TurfController.deleteTurfControler)
router.put('/update/:id', TurfController.updateTurfController)
router.get('/single/:id', TurfController.getSingleTurfController)
router.post('/create',validateRequest(TurfValidation.create), TurfController.createController)
router.get('/allTurfs', TurfController.getAllTurfsController)

export const TurfRouter = router