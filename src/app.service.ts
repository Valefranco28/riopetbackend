import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@Injectable()
export class AppService {
  #db: FirebaseFirestore.Firestore;
  #collection: FirebaseFirestore.CollectionReference;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: admin.app.App) {
    this.#db = this.firebaseApp.firestore();
    this.#collection = this.#db.collection('testColletion');
    console.log('colletion',  this.#collection)
  }


  async saveDataCollection(): Promise<string> {
    try {
      // Datos que deseas guardar en la colección
      const dataToSave = {
        field1: 'value1',
        field2: 'value2',
        field3: 'value3'
        // Agrega todos los campos que desees
      };

      // Agrega el objeto a la colección y obtén una referencia al documento creado
      const docRef = await this.#collection.add(dataToSave);

      // Puedes obtener el ID del documento recién creado
      const docId = docRef.id;

      return `Documento guardado con ID: ${docId}`;
    } catch (error) {
      // Maneja errores aquí si es necesario
      console.error('Error al guardar en la colección:', error);
      throw error;
    }
  }

}
