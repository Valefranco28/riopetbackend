import { ExecutionContext, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { User } from 'src/commons/modelos/user.interface';
import { UserRole } from './../commons/enum/user-role.enum';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Injectable()
export class AutenticacionService {

    async createUser(userData: User, role: UserRole): Promise<UserRecord> {
        const uid = await admin.auth().createUser(userData);
        
        // Asigna el rol al usuario
        await this.assignUserRole(uid.uid, role);
        return uid;
    }

    async validateToken(token: string): Promise<DecodedIdToken> {
        try {
            // Verifica el token JWT
            const decodedToken = await admin.auth().verifyIdToken(token);
      
   
            console.log('decodedToken', decodedToken)
            return decodedToken
          } catch (error) {
            // Maneja cualquier error que ocurra durante la verificación del token
            return error.message
          }
    }

    async assignUserRole(uid: string, role: UserRole): Promise<void> {

      console.log('uid', uid);
      console.log('role', role);
      // Define un atributo personalizado que represente el rol en el perfil del usuario
      const customClaims = { role };
    
      // Asigna los atributos personalizados al usuario
      await admin.auth().setCustomUserClaims(uid, customClaims);
    }



}
