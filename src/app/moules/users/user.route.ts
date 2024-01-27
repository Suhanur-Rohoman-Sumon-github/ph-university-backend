import express  from 'express'
import { userController } from './user.controller'
import { StudentValidation } from '../students/student.validation'
import validateRequest from '../../../middleware/validateRequest'

const router = express.Router()
router.post('/create-students',validateRequest(StudentValidation.StudentValidationSchema), userController.createStudent)

export const UserRouter = router
