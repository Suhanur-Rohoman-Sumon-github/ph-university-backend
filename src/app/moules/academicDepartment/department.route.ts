import express from 'express'
import { DepartmentControllers } from './department.controller'
import validateRequest from '../../../middleware/validateRequest'
import { DepartmentValidation } from './department.validation'

const router = express.Router()

router.post(
  '/create-department',
  // validateRequest(
  //   DepartmentValidation.createDepartmentValidationSchema,
  // ),
  DepartmentControllers.createDepartmemt,
)

router.get('/:departmentId', DepartmentControllers.getSingleDepartment)

router.patch(
  '/:departmentId',
  validateRequest(DepartmentValidation.updateDepartmentValidationSchema),
  DepartmentControllers.updateDeartment,
)

router.get('/', DepartmentControllers.getAllDepartments)

export const DepartmentRoutes = router
