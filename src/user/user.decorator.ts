import type { ExecutionContext } from '@nestjs/common'
import { createParamDecorator } from '@nestjs/common'

/**
 * retrieve the current user with a decorator
 * example of a controller method:
 * @Post()
 * someMethod(@User() user: User) {
 *   // do something with the user
 * }
 */
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})
