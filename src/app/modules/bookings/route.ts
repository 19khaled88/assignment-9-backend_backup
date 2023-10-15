import express from 'express'
import validateRequest from '../../middleware/validationMiddleware'
import { BookingController } from './controller'
import { BookingValidation } from './validation'


const router = express.Router()

router.delete('/delete/:id', BookingController.deleteBookingController)
router.put('/update/:id', BookingController.updateBookingController)
router.get('/single/:id', BookingController.getSingleBookingController)
router.post('/create', validateRequest(BookingValidation.create), BookingController.createBookingController)
router.get('/allBookings', BookingController.getAllBookingsController)

export const BookingRouter = router