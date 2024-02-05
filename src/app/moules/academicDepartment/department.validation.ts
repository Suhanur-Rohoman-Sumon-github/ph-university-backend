import { z } from 'zod'

const createDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: ' department must be string',
      required_error: 'Name is required',
    }),
    Faculty: z.string({
      invalid_type_error: ' faculty must be string',
      required_error: 'Faculty is required',
    }),
  }),
})

const updateDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: ' department must be string',
        required_error: 'Name is required',
      })
      .optional(),
    Faculty: z
      .string({
        invalid_type_error: ' faculty must be string',
        required_error: 'Faculty is required',
      })
      .optional(),
  }),
})

export const DepartmentValidation = {
  createDepartmentValidationSchema,
  updateDepartmentValidationSchema,
}
