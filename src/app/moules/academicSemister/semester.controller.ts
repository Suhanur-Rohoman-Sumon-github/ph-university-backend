import httpStatus from 'http-status'
import catchAsync from '../../../utils/catchAsync'
import sendResponse from '../../../utils/sendResponse'
import { Request, Response } from 'express'
import { SemesterService } from './semester.services'

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const results = await SemesterService.createSemesterIntoDb(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester created successfully',
    data: results,
  })
})

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await SemesterService.getAllAcademicSemestersFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  })
})

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params
  const result =
    await SemesterService.getSingleAcademicSemesterFromDB(semesterId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  })
})

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params
  const result = await SemesterService.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  })
})

export const SemesterController = {
  createSemester,
  getAllAcademicSemesters,
  updateAcademicSemester,
  getSingleAcademicSemester,
}
