import { IsEmail, IsEnum, IsString, IsNotEmpty } from 'class-validator'

export enum UserRole {
  INTERN = 'INTERN',
  ENGINEER = 'ENGINEER',
  ADMIN = 'ADMIN',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string

  @IsEnum(UserRole, {
    message: 'Role must be one of the following: INTERN, ENGINEER, ADMIN',
  })
  role: UserRole
}
