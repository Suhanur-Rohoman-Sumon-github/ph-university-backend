import { z } from 'zod'
import validator from 'validator'

const NameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, {
      message: 'First name should start with an uppercase letter',
    }),
  middleName: z.string(),
  lastName: z.string().refine(value => validator.isAlpha(value), {
    message: 'Last name should be a valid string',
  }),
})

const GuardianSchema = z.object({
  fatherName: z.string(),
  fatherContactNo: z.string(),
  fatherOccupation: z.string(),
  matherContactNo: z.string(),
  matherName: z.string(),
  matherOccupation: z.string(),
})

const LocalGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
})

const StudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    students: z.object({
      name: NameSchema,
      gender: z.enum(['male', 'female']),
      contactNumber: z.string(),
      emergencyContactNumber: z.string(),
      email: z.string().email(),
      bloodgroupe: z.enum(['a+', 'b+']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: GuardianSchema,
      localGuardian: LocalGuardianSchema,
      admissionSemester: z.string(),
    }),
  }),
})

export const StudentValidation = {
  StudentValidationSchema,
}
