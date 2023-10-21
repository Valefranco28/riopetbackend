import { Body, Controller, ExecutionContext, Get, Post, Req, ValidationPipe } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { UserDto } from 'src/commons/dto/user.dto';
import { TokenDto } from 'src/commons/dto/token.dto';
import { UserRole } from './../commons/enum/user-role.enum';

@Controller('autenticacion')
export class AutenticacionController {
    constructor(private readonly autenticacionService: AutenticacionService) {}


   @Post()
    async register(@Body(new ValidationPipe()) userData: UserDto) {
    let userRole: UserRole;
    if(userData.role === 'user'){
         userRole =  UserRole.USER;
    } else {
         userRole =  UserRole.ADMIN;
    }
    const uid = this.autenticacionService.createUser(userData, userRole);    
    return uid;
   }

   @Get()
   async userRole(@Req() req: Request,){ 
     const authorizationHeader = req.headers['authorization']; // Acceder al encabezado de autorización
  
     if (!authorizationHeader) {
       // Manejar el caso en el que no se proporciona el encabezado de autorización
       return 'No se proporcionó el encabezado de autorización.';
     }

     const token = authorizationHeader.replace('Bearer ', '');
     const userdata = await this.autenticacionService.validateToken(token);
     return userdata;
   }


}

