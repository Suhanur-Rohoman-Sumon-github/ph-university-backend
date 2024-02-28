/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../config'
import { TUser } from './user.interface'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils'
import { TStudent } from '../students/student.interface'
import { academicSemesterModel } from '../academicSemister/semister.model'
import AppError from '../../errors/appError'
import { DepartmentModels } from '../academicDepartment/department.model'
import { UserModel } from './user.model'
import { StudentModel } from '../students/student.model'
import { TFaculty } from '../academicFacultes/faculty.interface'
import { FacultyModel } from '../academicFacultes/faculty.model'
import { TAdmin } from '../admin/admin.interface'
import { AdminModels } from '../admin/admin.model'

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  // create a user object
  const userData: Partial<TUser> = {}

  //if password is not given , use default password
  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'student'
  // set student email
  userData.email = payload.email

  // find academic semester info
  const admissionSemester = await academicSemesterModel.findById(
    payload.admissionSemester,
  )

  if (!admissionSemester) {
    throw new AppError(400, 'Admission semester not found')
  }

  // find department
  const academicDepartment = await DepartmentModels.findById(
    payload.academicDepartment,
  )

  if (!academicDepartment) {
    throw new AppError(400, 'Aademic department not found')
  }
  payload.academicFaculty = academicDepartment.Faculty

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateStudentId(admissionSemester)

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session }) // array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a student (transaction-2)
    const newStudent = await StudentModel.create([payload], { session })

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    await session.commitTransaction()
    await session.endSession()

    return newStudent
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // create a user object
  const userData: Partial<TUser> = {}

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string)

  //set faculty role
  userData.role = 'faculty'
  //set faculty email
  userData.email = payload.email

  // find academic department info
  const academicDepartment = await DepartmentModels.findById(
    payload.academicDepartment,
  )

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found')
  }

  payload.academicFaculty = academicDepartment?.Faculty

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateFacultyId()

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session }) // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await FacultyModel.create([payload], { session })

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }

    await session.commitTransaction()
    await session.endSession()

    return newFaculty
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  // create a user object
  const userData: Partial<TUser> = {}

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'admin'
  //set admin email
  userData.email = payload.email
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateAdminId()

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session })

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a admin (transaction-2)
    const newAdmin = await AdminModels.create([payload], { session })

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }

    await session.commitTransaction()
    await session.endSession()

    return newAdmin
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const getMe = async (userId: string, role: string) => {
  let result = null
  if (role === 'student') {
    result = await StudentModel.findOne({ id: userId }).populate('user')
  }
  if (role === 'admin') {
    result = await AdminModels.findOne({ id: userId }).populate('user')
  }

  if (role === 'faculty') {
    result = await FacultyModel.findOne({ id: userId }).populate('user')
  }

  return result
}

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
}
