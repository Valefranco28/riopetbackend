import { Module } from '@nestjs/common';
import { MascotasController } from './mascotas.controller';
import { MascotasService } from './mascotas.service';
import * as admin from 'firebase-admin';
import { AutenticacionService } from 'src/autenticacion/autenticacion.service';
import { AutenticacionModule } from 'src/autenticacion/autenticacion.module';

@Module({
  controllers: [MascotasController],
  providers: [{
    provide: 'FIREBASE_APP',
    useFactory: () => {
      return admin.app(); // Devuelve la instancia ya inicializada de Firebase App
    },
  }, MascotasService, AutenticacionService]
})
export class MascotasModule {}
