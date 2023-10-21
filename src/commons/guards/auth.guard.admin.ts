import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AutenticacionService } from 'src/autenticacion/autenticacion.service';
import { UserRole } from '../enum/user-role.enum';


@Injectable()
export class AuthGuardAdmin implements CanActivate {
  constructor(private readonly authService: AutenticacionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    console.log('idtoken', token)

    if (!token) {
      console.log('ni siquierea hay token en la peticion');
      return false; // No se proporcionó un token
    }

    try {
      // Verifica el token
      const decodedToken = await this.authService.validateToken(token);

      if (decodedToken.role === UserRole.ADMIN) {
        return true; // El usuario es un administrador, permitir el acceso
      } else {
        console.log('hay token pero es invalido');
        return false; // El usuario no tiene permisos suficientes
      }
    } catch (error) {
      console.log('hay token pero es invalido');
      return false; // El token no es válido o ha expirado
    }
  }
}