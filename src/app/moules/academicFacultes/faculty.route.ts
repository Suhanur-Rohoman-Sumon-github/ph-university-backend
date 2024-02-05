import express from 'express'
import validateRequest from '../../../middleware/validateRequest'
import { FacultyValidation } from './faculty.validation'
import { FacultyControllers } from './faculty.controller'

const router = express.Router()

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyValidationSchema),
  FacultyControllers.createFaculty,
)

router.get('/:facultyId', FacultyControllers.getSingleFaculty)
router.get('/', FacultyControllers.getAllFaculties)

router.patch(
  '/:facultyId',
  validateRequest(FacultyValidation.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
)

export const FacultyRoutes = router
