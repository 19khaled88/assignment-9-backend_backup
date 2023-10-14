

import express from 'express'
import { UserController } from './controller'
import validateRequest from '../../middleware/userRoleValidation'
import { UserValidation } from './validation'

const router = express.Router()

router.post('/signUp',UserController.signUpController)

router.get('/single/:id', UserController.getSingleUserController)
router.delete('/delete/:id', UserController.deleteUserControler)
router.put('/update/:id', UserController.updateUserController)
router.post('/signUp',validateRequest(UserValidation.create), UserController.signUpController)
router.post('/signIn', UserController.signInController)
router.get('/allUser', UserController.getAllUsersController)

export const UserRouter = router