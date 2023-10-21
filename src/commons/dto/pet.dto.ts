import { IsString, IsNumber, IsArray, IsNotEmpty } from 'class-validator';
import { disease } from '../modelos/mascota.interface';

export class CreatePetDto {
    @IsNotEmpty({ message: 'El campo name no puede estar vacío' })
    @IsString()
    name: string;
  
    @IsNotEmpty({ message: 'El campo species no puede estar vacío' })
    @IsString()
    species: string;
  
    @IsNotEmpty({ message: 'El campo age no puede estar vacío' })
    @IsString()
    age: string;
  
    @IsNotEmpty({ message: 'El campo color no puede estar vacío' })
    @IsString()
    color: string;
  
    @IsNotEmpty({ message: 'El campo sex no puede estar vacío' })
    @IsString()
    gender: string;
  
    @IsNotEmpty({ message: 'El campo size no puede estar vacío' })
    @IsString()
    size: string;
  
    @IsNotEmpty({ message: 'El campo estate no puede estar vacío' })
    @IsString()
    estate: string;
  
    @IsNotEmpty({ message: 'El campo diseases no puede estar vacío' })
  
    diseases: disease[];
  
    @IsNotEmpty({ message: 'El campo Sterilized no puede estar vacío' })
    @IsString()
    sterilized: string;

    @IsNotEmpty({ message: 'El campo monthyear no puede estar vacío' })
    @IsString()
    monthyear: number;

    @IsNotEmpty({ message: 'El campo date no puede estar vacío' })
    @IsString()
    date: number;
  

    image: string; // Puedes definirlo como null si es opcional
}


export class UpdatePetDto extends CreatePetDto { // Extiende CreatePetDto
    @IsNotEmpty({ message: 'El campo doc no puede estar vacío' })
    @IsString()
    doc: string;

    @IsString()
    imageBinary: string;
}

