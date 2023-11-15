import express from 'express'
import validateRequest from '../../middleware/validationMiddleware'
import { FieldController } from './controller'
import { FieldValidation } from './validation'
import authCheck from '../../middleware/authCheck'
import { RoleEnumType } from '@prisma/client'


const router = express.Router()

router.delete('/delete/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), FieldController.deleteFieldController)
router.put('/update/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), FieldController.updateFieldController)
router.get('/single/:id', FieldController.getSingleFieldController)
router.get('/singleTurfId/:id',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), FieldController.singleFieldByTurfId)
router.post('/create',authCheck(RoleEnumType.ADMIN,RoleEnumType.SUPER_ADMIN), validateRequest(FieldValidation.create), FieldController.createController)
router.get('/allFields', FieldController.getAllFieldController)

export const FieldRouter = router