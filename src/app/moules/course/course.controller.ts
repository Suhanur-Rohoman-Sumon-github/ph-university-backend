import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { courseServices } from './course.services'

const createCourse = catchAsync(async (req, res) => {
  const corseData = req.body

  const result = await courseServices.createCourseIntoDB(corseData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  })
})
const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await courseServices.getSingleCourseFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  })
})

const getAllCourse = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCoursesFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'corse are retrieved successfully',
    data: result,
  })
})

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await courseServices.deleteACorseFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  })
})

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params
 
  const result = await courseServices.updateCourseIntoDB(id,req.body )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course  is updated successfully',
    data: result,
  })
})

export const CorseController = {
  createCourse,
  getAllCourse,
  deleteCourse,
  getSingleCourse,
  updateCourse
}
