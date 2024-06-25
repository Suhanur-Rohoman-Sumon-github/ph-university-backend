import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { semesterRegistrationServices } from './semesterRegistetion.services'

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.createSemesterRegistrationInDb(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester registration created successfully',
    data: result,
  })
})
const getAllCreatedSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.getAllCreatedSemesterRegistrationFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester registration  retrieve successfully',
    data: result,
  })
})
const getAllCreatedSingleSemesterRegistration = catchAsync(async (req, res) => {
  const {semesterRegistrationId} = req.params
  const result =
    await semesterRegistrationServices.getAllCreatedSingleSemesterRegistrationFromDB(semesterRegistrationId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single semester registration  retrieve successfully',
    data: result,
  })
})



export const semesterRegistrationControllers = {
  createSemesterRegistration,
  getAllCreatedSemesterRegistration,
  getAllCreatedSingleSemesterRegistration
}
