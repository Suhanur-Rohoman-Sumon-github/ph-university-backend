import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './semesters.interface'
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './semester.constant'

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, required: true, enum: academicSemesterName },
  year: { type: String, required: true, unique: true },
  code: { type: String, required: true, enum: academicSemesterCode },
  startMonth: { type: String, enum: months, required: true },
  endMonth: { type: String, enum: months, required: true },
})
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await academicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  })
  if (isSemesterExist) {
    throw new Error('semester is already exist')
  }
  next()
})

export const academicSemesterModel = model<TAcademicSemester>(
  'Semester',
  academicSemesterSchema,
)
