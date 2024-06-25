import mongoose from 'mongoose'
import QueryBuilder from '../../builder/queryBuilder'
import { courseSearchableField } from './course.const'
import { TCourse } from './course.interface'
import { CourseModel } from './course.model'
import AppError from '../../errors/appError'
import httpStatus from 'http-status'

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload)
  return result
}
const getAllCoursesFromDB = async (payload: Record<string, unknown>) => {
  const corseQuery = new QueryBuilder(
    CourseModel.find().populate('preRequisiteCourses.course'),
    payload,
  )
    .search(courseSearchableField)
    .filter()
    .paginate()
    .sort()
    .fields()
  const result = await corseQuery.modelQuery
  return result
}
const getSingleCourseFromDB = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    'preRequisiteCourses.course',
  )
  return result
}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload
  const session = await mongoose.startSession()

  try {
    await session.startTransaction()

    const updateBasicCourseInfo = await CourseModel.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'field to update course ')
    }

    // if there any pre requesit courses

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out the deleted fields
      const deletedPreRequisite = preRequisiteCourses
        .filter(el => el.course && el.isDeleted)
        .map(el => el.course)
      const deletedPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisite } },
          },
        },
        { new: true, runValidators: true, session },
      )

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'failed to deleted data ')
      }
      const newPreRequisite = preRequisiteCourses?.filter(
        el => el.course && !el.isDeleted,
      )

      const newPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisite } },
        },
        { new: true, runValidators: true, session },
      )
      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'failed to add new data  ')
      }
    }
    const result = await CourseModel.findById(id).populate(
      'preRequisiteCourses.course',
    )
    await session.commitTransaction()
    await session.endSession()

    return result
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'failed to add new data  ')
  }
}

const deleteACorseFromDB = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  )
  return result
}

export const courseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteACorseFromDB,
  updateCourseIntoDB,
}
