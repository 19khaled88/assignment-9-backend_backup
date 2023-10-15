import express from 'express'
import validateRequest from '../../middleware/validationMiddleware'
import { FieldController } from './controller'
import { FieldValidation } from './validation'


const router = express.Router()

router.delete('/delete/:id', FieldController.deleteFieldController)
router.put('/update/:id', FieldController.updateFieldController)
router.get('/single/:id', FieldController.getSingleFieldController)
router.post('/create', validateRequest(FieldValidation.create), FieldController.createController)
router.get('/allGameType', FieldController.getSingleFieldController)

export const FieldRouter = router