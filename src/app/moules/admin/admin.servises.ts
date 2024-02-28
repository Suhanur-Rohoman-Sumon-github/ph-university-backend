/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import { AdminSearchableFields } from './admin.const'
import QueryBuilder from '../../builder/queryBuilder'
import { AdminModels } from './admin.model'
import { TAdmin } from './admin.interface'
import AppError from '../../errors/appError'
import { UserModel } from '../users/user.model'

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(AdminModels.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await adminQuery.modelQuery
  const meta = await adminQuery.countTotal()
  return {
    result,
    meta,
  }
}

const getSingleAdminFromDB = async (id: string) => {
  const result = await AdminModels.findById(id)
  return result
}

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  const result = await AdminModels.findByIdAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  )
  return result
}

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedAdmin = await AdminModels.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    // get user _id from deletedAdmin
    const userId = deletedAdmin.user

    const deletedUser = await UserModel.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedAdmin
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
}
