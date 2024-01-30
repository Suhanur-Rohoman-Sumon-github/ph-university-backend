import { Request, Response } from 'express'
import { StudentServices } from './student.servises'
import catchAsync from '../../../utils/catchAsync'
import sendResponse from '../../../utils/sendResponse'
import httpStatus from 'http-status'

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const results = await StudentServices.getAllUserDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all user retrieve successfully ',
    data: results,
  })
})

const singleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const results = await StudentServices.getSingleDatafromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single user find successfully ',
    data: results,
  })
})

const deleteStudentFromDb = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const results = await StudentServices.deleteStudentDb(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student data deleted successfully',
    data: results,
  })
})

export const StudentControllers = {
  getAllStudents: getAllStudents,
  singleUser,
  deleteStudentFromDb,
}
