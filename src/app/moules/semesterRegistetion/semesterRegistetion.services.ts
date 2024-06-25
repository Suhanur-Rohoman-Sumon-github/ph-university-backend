import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { academicSemesterModel } from '../academicSemister/semister.model'
import { TSemesterRegistration } from './semesterRegistetion.interface'
import { semesterRegistrationModel } from './semesterRegistetion.model'

const createSemesterRegistrationInDb = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester
  const isAcademicSemesterExists =
    await academicSemesterModel.findById(academicSemester)

  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'academic semester is not found ')
  }
  const isSemesterRegistrationExists = await semesterRegistrationModel.findOne({
    _id: academicSemester,
  })

  if (isSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, 'this semester is already exists ')
  }

  const result = await semesterRegistrationModel.create(payload)
  return result
}

const getAllCreatedSemesterRegistrationFromDB = async ()=>{
  const result = semesterRegistrationModel.find().populate('Semester')
  return result
}
const getAllCreatedSingleSemesterRegistrationFromDB = async (id:string)=>{
  const result = semesterRegistrationModel.findById(id).populate('Semester')
  return result
}

export const semesterRegistrationServices = {
  createSemesterRegistrationInDb,
  getAllCreatedSemesterRegistrationFromDB,
  getAllCreatedSingleSemesterRegistrationFromDB
}
