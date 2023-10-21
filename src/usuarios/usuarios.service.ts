import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuariosService {

    getUsuarios(): string {
        return 'Usuarios';
      }

    getUsuario(): string {
        return 'usuario';
    }

    getUsuarioBloqueado(): string {
        return 'bloqueados';
    }

}
