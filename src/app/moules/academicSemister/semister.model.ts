import { Schema, model } from 'mongoose'
import { Months, TAcademicSemester } from './semister.interface'

const months: Months[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, required: true, unique: true },
    year: { type: Date, required: true, unique: true },
    code: { type: String ,required: true, },
    startMonth: { type: String, enum: months },
    endMonth:{ type: String, enum: months },
  },
  
)

export const academicSemesterModel = model<TAcademicSemester>('academicSemester',academicSemesterSchema)