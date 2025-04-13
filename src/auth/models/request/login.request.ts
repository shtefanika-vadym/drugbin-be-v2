import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const LoginRequestSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string(),
})

export class LoginRequest extends createZodDto(LoginRequestSchema) {}
