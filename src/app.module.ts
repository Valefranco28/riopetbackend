import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MascotasModule } from './mascotas/mascotas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import * as admin from 'firebase-admin';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MascotasModule,
    UsuariosModule,
    AutenticacionModule],
  controllers: [AppController],
  providers: [ 
    {
      provide: 'FIREBASE_APP',
      useFactory: () => {
        return admin.app(); // Devuelve la instancia ya inicializada de Firebase App
      },
    }
    , AppService ],
})
export class AppModule {}
