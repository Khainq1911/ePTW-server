import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  roleId: number;
  phone: string;
  iat: number; 
  exp: number; 
}
