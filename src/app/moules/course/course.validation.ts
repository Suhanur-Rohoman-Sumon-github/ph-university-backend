import z from 'zod'

const prerequisiteCorseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
})

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credit: z.number(),
    isDeleted:z.boolean().optional(),
    preRequisiteCourses: z.array(prerequisiteCorseValidationSchema).optional(),
  }),
})

const updatePrerequisiteCorseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
})

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credit: z.number().optional(),
    isDeleted:z.boolean().optional(),
    preRequisiteCourses: z.array(updatePrerequisiteCorseValidationSchema).optional(),
  }),
})



export const courseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema
}
