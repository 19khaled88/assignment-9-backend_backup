import express from 'express'
import validateRequest from '../../middleware/validationMiddleware'
import { PaymentController } from './controller'
import { PaymentValidation } from './validation'


const router = express.Router()

router.delete('/delete/:id', PaymentController.deletePaymentController)
router.put('/update/:id', PaymentController.updatePaymentController)
router.get('/single/:id', PaymentController.getSinglePaymentController)
router.post('/create', validateRequest(PaymentValidation.create), PaymentController.createController)
router.get('/allPayments', PaymentController.getAllPaymentController)

export const PaymentRouter = router