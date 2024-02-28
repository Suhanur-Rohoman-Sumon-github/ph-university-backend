/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { UserControllers } from './user.controller'
import validateRequest from '../../../middleware/validateRequest'
import { createAdminValidationSchema } from '../admin/admin.validation'
import { UserValidation } from './user.validation'
import { createStudentValidationSchema } from '../students/student.validation'
import { createFacultyValidationSchema } from '../academicFacultes/faculty.validation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
)

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
)

router.post(
  '/create-admin',

  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
)

router.post(
  '/change-status/:id',
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
)

router.get('/me', UserControllers.getMe)

export const UserRoutes = router
