import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'El campo email no puede estar vacío' })
  @IsEmail({}, { message: 'Debes proporcionar un correo electrónico válido' })
  email: string;

  @IsNotEmpty({ message: 'El campo password no puede estar vacío' })
  @MinLength(10, { message: 'La contraseña debe tener al menos 10 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'El campo rol no puede estar vacío' })
  @MinLength(4, { message: 'La role debe tener al menos 10 caracteres' })
  role: string;

  @IsNotEmpty({ message: 'El campo displayName no puede estar vacío' })
  displayName: string;
}