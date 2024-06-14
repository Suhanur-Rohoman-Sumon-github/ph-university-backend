import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { courseValidation } from './course.validation'
import { CorseController } from './course.controller'

const router = express.Router()

router.post(
  '/create-course',
  validateRequest(courseValidation.createCourseValidationSchema),
  CorseController.createCourse,
)

router.get(
  '/:id',

  CorseController.getSingleCourse,
)

  router.patch(
    '/:id',

    validateRequest(courseValidation.updateCourseValidationSchema),
    CorseController.updateCourse,
  )

router.delete(
  '/:id',

  CorseController.deleteCourse,
)

router.get(
  '/',

  CorseController.getAllCourse,
)

export const CorseRoute = router
