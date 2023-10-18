import express from 'express'
import validateRequest from '../../middleware/validationMiddleware'
import { PaymentController } from './controller'
import { PaymentValidation } from './validation'
import authCheck from '../../middleware/authCheck'
import { RoleEnumType } from '@prisma/client'


const router = express.Router()

router.delete('/delete/:id', PaymentController.deletePaymentController)
router.put('/update/:id', PaymentController.updatePaymentController)
router.get('/single/:id', PaymentController.getSinglePaymentController)
router.post('/create', validateRequest(PaymentValidation.create), PaymentController.createController)
router.get('/allPayments',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), PaymentController.getAllPaymentController)

export const PaymentRouter = router