/* eslint-disable no-useless-catch */
import config from '../../config'
import { TStudent } from '../students/student.interface'
import { StudentModel } from '../students/student.model'
import { TUser } from './user.interface'
import { UserModel } from './user.model'

const createStudentIntoDB = async (password: string, student: TStudent) => {
  const userData: Partial<TUser> = {}

  // if password is not there use default password
  userData.password = password || (config.default_password as string)
  userData.role = 'student'
  userData.id = '203010001'

  try {
    // create new user
    const newUser = await UserModel.create(userData)

    // create new student
    if (Object.keys(newUser).length) {
      student.id = newUser.id
      // reference id
      student.user = newUser._id
    }

    // create a new student and wait for the result
    const result = await StudentModel.create(student)

    return result
  } catch (error) {
    throw error // rethrow error for handling in the caller function
  }
}

export const UserService = {
  createStudentIntoDB,
}
