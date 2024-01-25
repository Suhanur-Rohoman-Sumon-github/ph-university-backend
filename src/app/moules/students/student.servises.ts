import { StudentModel } from './student.model'
import { TStudent } from './student.interface'

const creatStudentIntoDB = async (student: TStudent) => {
  if (await StudentModel.isUserExist(student.id)) {
    throw new Error('user already existing')
  }
  const result = await StudentModel.create(student)
  return result
}

const getAllUserDB = async () => {
  const result = await StudentModel.find()
  return result
}

const getSingleDatafromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
  return result
}
const deleteStudentDb = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true })
  return result
}

export const StudentServices = {
  creatStudentIntoDB,
  getAllUserDB,
  getSingleDatafromDB,
  deleteStudentDb,
}
