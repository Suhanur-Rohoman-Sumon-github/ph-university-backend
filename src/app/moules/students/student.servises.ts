import { StudentModel } from './student.model'
import { TStudent } from './student.interface'



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
  getAllUserDB,
  getSingleDatafromDB,
  deleteStudentDb,
}
