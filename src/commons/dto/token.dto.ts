import { IsNotEmpty } from "class-validator";

export class TokenDto {
  
    @IsNotEmpty({ message: 'El campo token no puede estar vacío' })
    token: string;
  }