import express from 'express'
import { SemesterController } from './semester.controller'
import validateRequest from '../../../middleware/validateRequest'
import { semesterValidations } from './semester.validation'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(semesterValidations.SemesterValidationSchema),
  SemesterController.createSemester,
)

router.get('/:courseId', SemesterController.getSingleAcademicSemester)

router.patch(
  '/:courseId',
  validateRequest(semesterValidations.updateAcademicSemesterValidationSchema),
  SemesterController.updateAcademicSemester,
)

export const SemesterRoute = router
