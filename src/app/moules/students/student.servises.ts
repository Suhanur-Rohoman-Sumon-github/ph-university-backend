import { StudentModel } from './student.model'

const getAllUserDB = async () => {
  const result = await StudentModel.find().populate('admissionSemester').populate('user')
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
