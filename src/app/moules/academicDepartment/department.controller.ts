import httpStatus from 'http-status'
import catchAsync from '../../../utils/catchAsync'
import { DepartmentServices } from './department.services'
import sendResponse from '../../../utils/sendResponse'

const createDepartmemt = catchAsync(async (req, res) => {
  const result = await DepartmentServices.createDepartmentIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' department is created successfully',
    data: result,
  })
})

const getAllDepartments = catchAsync(async (req, res) => {
  const result = await DepartmentServices.getAllDepartmentsFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' departments are retrieved successfully',
    data: result,
  })
})

const getSingleDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params
  const result =
    await DepartmentServices.getSingleDepartmentFromDB(departmentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' department is retrieved succesfully',
    data: result,
  })
})

const updateDeartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params
  const result = await DepartmentServices.updateDepartmentIntoDB(
    departmentId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' department is updated succesfully',
    data: result,
  })
})

export const DepartmentControllers = {
  createDepartmemt,
  getAllDepartments,
  getSingleDepartment,
  updateDeartment,
}
