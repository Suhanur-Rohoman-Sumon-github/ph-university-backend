import { Schema, model } from 'mongoose'
import { TDepartment } from './department.interface'
import AppError from '../../errors/appError'
import httpStatus from 'http-status'

const DepartmentSchema = new Schema<TDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    Faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  },
  {
    timestamps: true,
  },
)

DepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await DepartmentModels.findOne({
    name: this.name,
  })

  if (isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This department is already exist!',
    )
  }

  next()
})

DepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  const isDepartmentExist = await DepartmentModels.findOne(query)

  if (!isDepartmentExist) {
    throw new AppError(404, 'This department does not exist!')
  }

  next()
})

export const DepartmentModels = model<TDepartment>(
  'Department',
  DepartmentSchema,
)
