import { academicSemesterNameCodeMapper } from './semester.constant'
import { TAcademicSemester } from './semesters.interface'
import { academicSemesterModel } from './semister.model'

const createSemesterIntoDb = (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('invalid semester code')
  }

  const result = academicSemesterModel.create(payload)
  return result
}

const getAllAcademicSemestersFromDB = async () => {
  const result = await academicSemesterModel.find()
  return result
}

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await academicSemesterModel.findById(id)
  return result
}

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code')
  }

  const result = await academicSemesterModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return result
}

export const SemesterService = {
  createSemesterIntoDb,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
}
