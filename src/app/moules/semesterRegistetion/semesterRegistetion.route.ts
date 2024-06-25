import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { semesterRegistrationValidationsSchema } from './semesterRegistetion.validation'
import { semesterRegistrationControllers } from './semesterRegistetion.controllers'
const router = express.Router()

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidationsSchema.createSemesterRegistrationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
)
router.get('/',semesterRegistrationControllers.getAllCreatedSemesterRegistration)
router.get('/:semesterRegistrationId',semesterRegistrationControllers.getAllCreatedSingleSemesterRegistration)

export const semesterRegistrationRoutes = router
