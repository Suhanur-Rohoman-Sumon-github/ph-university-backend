export type Months =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'
export type TAcademicSemesterName = 'Autumn' | 'summer' | 'Fall'
export type TAcademicSemesterCode = '01' | '02' | '03'
export type TAcademicSemester = {
  name: TAcademicSemesterName
  code: TAcademicSemesterCode
  year: string
  startMonth: Months
  endMonth: Months
}

export type TAcademicSemesterNameCodeMapper = {
  [key: string]: string
}
