/* eslint-disable no-useless-catch */
import mongoose from 'mongoose'
import config from '../../config'
import { academicSemesterModel } from '../academicSemister/semister.model'
import { TStudent } from '../students/student.interface'
import { StudentModel } from '../students/student.model'
import { TUser } from './user.interface'
import { UserModel } from './user.model'
import generateStudentId from './user.utils'
import AppError from '../../errors/appError'
import httpStatus from 'http-status'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {}

  const semester = await academicSemesterModel.findById(
    payload.admissionSemester,
  )
  // if password is not there use default password
  userData.password = password || (config.default_password as string)
  userData.role = 'student'

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    userData.id = await generateStudentId(semester)
    // create new user
    const newUser = await UserModel.create([userData], { session })

    // create new student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'request failed')
    }
    payload.id = newUser[0].id
    // reference id
    payload.user = newUser[0]._id
    // create a new student and wait for the result
    const newStudent = await StudentModel.create([payload], { session })
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'request failed')
    }

    await session.commitTransaction()
    await session.endSession()
    return newStudent
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    
    throw new AppError(404, `${error.message}`)
  }
}

export const UserService = {
  createStudentIntoDB,
}
