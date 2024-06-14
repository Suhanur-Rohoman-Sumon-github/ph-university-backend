import { model, Schema } from 'mongoose'
import { TCourse, preRequisiteCourses } from './course.interface'

// Define the prerequisite course schema
const preRequisiteCoursesSchema = new Schema<preRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

// Define the main course schema
const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  prefix: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: Number,
    required: true,
    trim: true,
  },
  credit: {
    type: Number,
    required: true,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
})

courseSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// Create the Course model
export const CourseModel = model<TCourse>('Course', courseSchema)
