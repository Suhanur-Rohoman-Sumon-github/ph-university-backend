import { TDepartment } from './department.interface'
import { Department } from './department.model'

const createDepartmentIntoDB = async (payload: TDepartment) => {
  const result = await Department.create(payload)
  return result
}

const getAllDepartmentsFromDB = async () => {
  const result = await Department.find().populate('Faculty').populate('Faculty')
  return result
}

const getSingleDepartmentFromDB = async (id: string) => {
  const result = await Department.findById(id).populate('Faculty')
  return result
}

const updateDepartmentIntoDB = async (
  id: string,
  payload: Partial<TDepartment>,
) => {
  const result = await Department.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const DepartmentServices = {
  createDepartmentIntoDB,
  getAllDepartmentsFromDB,
  getSingleDepartmentFromDB,
  updateDepartmentIntoDB,
}
