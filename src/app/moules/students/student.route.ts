import express from 'express'
import { StudentControllers } from './student.cntroller'

const router = express.Router()

router.post('/create-students', StudentControllers.createStudent)
router.get('/', StudentControllers.getAllstudents)
router.get('/:id', StudentControllers.singleUser)
router.delete('/:id', StudentControllers.deleteStudentFromDb)

export const StudentRouter = router
