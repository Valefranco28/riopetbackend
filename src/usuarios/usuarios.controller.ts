import { Controller, Get } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

    @Get()
    getUsuarios(): string {
      return this.usuariosService.getUsuarios();
    }

    @Get('/detalle')
    getUsuario(): string {
      return this.usuariosService.getUsuario();
    }


    @Get('/bloqueados')
    getUsuarioBloqueado(): string {
      return this.usuariosService.getUsuarioBloqueado();
    }
 
}
