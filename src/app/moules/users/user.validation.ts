import { z } from 'zod'

export const UserValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'password must be string',
    })
    .max(20, { message: 'password must be 20 character' }),
})

export default UserValidationSchema
