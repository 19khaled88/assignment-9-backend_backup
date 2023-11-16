import express from 'express'
import validateRequest from '../../middleware/validationMiddleware'
import { BookingController } from './controller'
import { BookingValidation } from './validation'
import authCheck from '../../middleware/authCheck'
import { RoleEnumType } from '@prisma/client'


const router = express.Router()

router.delete('/delete/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN,RoleEnumType.USER), BookingController.deleteBookingController)
router.put('/update/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), BookingController.updateBookingController)
router.get('/single/:id', BookingController.getSingleBookingController)

router.post('/create', validateRequest(BookingValidation.create), BookingController.createBookingController)

router.get('/allBookings',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN,RoleEnumType.USER), BookingController.getAllBookingsController)

export const BookingRouter = router