import { Request, Response } from 'express'
import { UserService } from './user.services'
import catchAsync from '../../../utils/catchAsync'
import sendResponse from '../../../utils/sendResponse'
import httpStatus from 'http-status'

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { students, password } = req.body

  const results = await UserService.createStudentIntoDB(password, students)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student created  successfully',
    data: results,
  })
})

export const userController = {
  createStudent,
}
