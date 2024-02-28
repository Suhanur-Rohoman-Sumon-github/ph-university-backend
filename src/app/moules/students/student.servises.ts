import mongoose from 'mongoose'
import { StudentModel } from './student.model'
import AppError from '../../errors/appError'
import httpStatus from 'http-status'
import { UserModel } from '../users/user.model'
import { TStudent } from './student.interface'
import QueryBuilder from '../../builder/queryBuilder'
import { studentSearchableFields } from './student.const'

const getAllUserDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate('user')
      ,
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
    const result = await studentQuery.modelQuery;
    return result
}

const getSingleDatafromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id: id })
  return result
}

const updateStudentIntoDb = async (id: string, payload: Partial<TStudent>) => {
  

  const { name, guardian, localGuardian, ...remainingData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }


  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  )

 
  return result
}

const deleteStudentDb = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'bad request')
    }
    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'bad request')
    }

    await session.commitTransaction()
    await session.endSession()
    return deletedStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
  }
}

export const StudentServices = {
  getAllUserDB,
  getSingleDatafromDB,
  deleteStudentDb,
  updateStudentIntoDb,
}
