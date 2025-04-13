import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const LoginResponseSchema = z.object({
  token: z.string(),
})

export class LoginResponse extends createZodDto(LoginResponseSchema) {
  constructor(token: string) {
    super()
    this.token = token
  }
}
