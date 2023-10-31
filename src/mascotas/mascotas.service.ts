import { Inject, Injectable } from '@nestjs/common';
import { Pet, PetWithDoc } from 'src/commons/modelos/mascota.interface';
import * as admin from 'firebase-admin';

@Injectable()
export class MascotasService {
  #db: FirebaseFirestore.Firestore;
  #collection: FirebaseFirestore.CollectionReference;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: admin.app.App) {
    this.#db = this.firebaseApp.firestore();
    this.#collection = this.#db.collection('pets');
  }

  async createPet(pet: Pet, file: Express.Multer.File, folder: string, token: string): Promise<string> {

    if(file !== undefined){
      const imageUrl = await this.uploadImage(file, folder, token);
      pet.image = imageUrl;
    }
    try {
      const docRef = await this.#collection.add(pet);
      const docId = docRef.id;
      return `Documento guardado con ID: ${docId}`;
    } catch (error) {
      console.error('Error al guardar pet  en la colección:', error);
      throw error;
    }

  }


  async getPet(pageSize: number, idDocument?: string): Promise<PetWithDoc[]> {
    let petList: PetWithDoc[] = [];
    try {
      let query = this.#collection
        .limit(pageSize);

        console.log('idDocument', idDocument)
      if (idDocument) {
        const startAfterDoc = await this.#collection.doc(idDocument);
        startAfterDoc.get().then((docSnapshot) => {

         console.log('docSnapshot', docSnapshot)
          query.startAt(docSnapshot) 
        })
      
      }

      const querySnapshot = await query.get();
      querySnapshot.forEach((doc) => {
        const petData = doc.data();
        const pet: PetWithDoc = {
          doc: doc.id,
          name: petData.name,
          species: petData.species,
          age: petData.age,
          color: petData.color,
          gender: petData.gender,
          size: petData.size,
          estate: petData.estate,
          diseases: petData.diseases,
          sterilized: petData.sterilized,
          image: petData.image,
          monthyear: petData.monthyear,
          date: petData.date,
          imageBinary: petData.imageBinary
        };
        petList.push(pet);
      });
    } catch (error) {
      console.log('error obteniendo lista de perros', error)
    }

    return petList;
  }

  async updateMascota(pet: PetWithDoc, file: Express.Multer.File, folder: string): Promise<void> {
    if(file !== undefined){
      const imageUrl = await this.uploadImage(file, folder, 'token');
      pet.image = imageUrl;
    }

    try {
      // Primero, obtén una referencia al documento de Firestore que deseas actualizar
      const docRef = this.#collection.doc(pet.doc); // Suponiendo que cada mascota tiene un campo 'id' que la identifica
      // Luego, actualiza los campos de la mascota
      await docRef.update({
        name: pet.name,
        species: pet.species,
        age: pet.age,
        color: pet.color,
        gender: pet.gender,
        size: pet.size,
        estate: pet.estate,
        diseases: pet.diseases,
        Sterilized: pet.sterilized,
        image: pet.image,
        imageBinary: pet.imageBinary
      });
      console.log("Mascota actualizada correctamente");
    } catch (error) {
      // Manejo de errores
      console.error("Error al actualizar la mascota:", error);
    }
  }

  async deletePetByDocId(docId: string): Promise<string> {
    try {
      // Obtén una referencia al documento que deseas eliminar utilizando el ID proporcionado
      const docRef = this.#collection.doc(docId);

      // Llama al método delete() para eliminar el documento
      await docRef.delete();
      return 'La mascota se ha eliminado correctamente';
    } catch (error) {
      // Manejo de errores
      console.error("Error al eliminar la mascota:", error);
      return 'hubo un error eliminado la mascota';
    }
  }

  async uploadImage(file: Express.Multer.File, folder: string, token: string): Promise<string> {
    try {
      const bucket = this.firebaseApp.storage().bucket();
      const fileName = `${folder}/${Date.now()}_${file.originalname}`;
      const fileUpload = bucket.file(fileName);
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
          Authorization: `${token}`,
        },
      });

      return new Promise<string>((resolve, reject) => {
        stream.on('error', (error) => reject(error));
        stream.on('finish', async () => {
          // The file has been successfully uploaded, now get the download URL.
          const [url] = await fileUpload.getSignedUrl({
            expires: '12-12-2099',
            action: 'read'
          });
          resolve(url);
        });

        stream.end(file.buffer);
      });

    } catch (error) {
      console.error("Error al subienodo la foto de la mascota:", error);
      throw 'Error al subienodo la foto de la mascota';
    }

  }

}
