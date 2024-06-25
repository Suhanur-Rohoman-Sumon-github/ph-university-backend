import { Schema, model } from 'mongoose'
import { TSemesterRegistration } from './semesterRegistetion.interface'
import { semesterRegistrationStatus } from './semesterRegistretion.const'

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.ObjectId,
      ref: 'Semester',
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: semesterRegistrationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    maxCredit: {
      type: Number,
      default: 3,
    },
    minCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
)

export const semesterRegistrationModel = model<TSemesterRegistration>(
  'semesterRegistrations',
  semesterRegistrationSchema,
)
