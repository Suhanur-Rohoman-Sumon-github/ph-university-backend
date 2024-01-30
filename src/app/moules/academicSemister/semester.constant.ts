import {
  Months,
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TAcademicSemesterNameCodeMapper,
} from './semesters.interface'

export const months: Months[] = [
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
  'December',
]

export const academicSemesterName: TAcademicSemesterName[] = [
  'Autumn',
  'summer',
  'Fall',
]
export const academicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03']

export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: '01',
  summer: '02',
  Fall: '03',
}
