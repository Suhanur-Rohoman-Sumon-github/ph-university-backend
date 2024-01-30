/* eslint-disable no-useless-catch */
import config from '../../config'
import { academicSemesterModel } from '../academicSemister/semister.model'
import { TStudent } from '../students/student.interface'
import { StudentModel } from '../students/student.model'
import { TUser } from './user.interface'
import { UserModel } from './user.model'
import generateStudentId from './user.utils'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {}

  const semester = await academicSemesterModel.findById(payload.admissionSemester)
  // if password is not there use default password
  userData.password = password || (config.default_password as string)
  userData.role = 'student'
  userData.id = await generateStudentId(semester)

  try {
    // create new user
    const newUser = await UserModel.create(userData)

    // create new student
    if (Object.keys(newUser).length) {
      payload.id = newUser.id
      // reference id
      payload.user = newUser._id
    }

    // create a new student and wait for the result
    const result = await StudentModel.create(payload)

    return result
  } catch (error) {
    throw error 
  }
}

export const UserService = {
  createStudentIntoDB,
}
