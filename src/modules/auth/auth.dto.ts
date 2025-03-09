export enum RoleEnum {
  WORKER = 1,
  SUPERVISOR = 2,
  ADMIN = 3,
}

export class LoginDto {
  username: string;
  password: string;
}

export class RegisterDto {
  name: string;
  phone: string;
  email: string;
  password: string;
}
