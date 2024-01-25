import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

router.post('/create-students', userController.createStudent)

export const UserRouter = router
