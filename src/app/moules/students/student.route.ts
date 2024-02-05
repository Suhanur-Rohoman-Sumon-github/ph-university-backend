import express from 'express'
import { StudentControllers } from './student.cntroller'
import validateRequest from '../../../middleware/validateRequest'
import { updateStudentValidationSchema } from './student.validation'

const router = express.Router()

router.get('/', StudentControllers.getAllStudents)
router.get('/:id', StudentControllers.singleUser)
router.delete('/:id', StudentControllers.deleteStudentFromDb)
router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
)

export const StudentRouter = router
