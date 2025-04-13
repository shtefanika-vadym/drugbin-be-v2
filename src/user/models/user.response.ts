import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const UserResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
})

export type UserResponseType = z.infer<typeof UserResponseSchema>

export class UserResponse extends createZodDto(UserResponseSchema) {}
