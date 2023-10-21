import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CreatePetDto, UpdatePetDto } from 'src/commons/dto/pet.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {  AuthGuardAdmin } from 'src/commons/guards/auth.guard.admin';
import { AuthGuardUser } from 'src/commons/guards/auth.guard.user';

@Controller('pet')
export class MascotasController {

    constructor(private readonly mascotasService: MascotasService) {}

    @Post()
    @UseGuards(AuthGuardAdmin)
    @UseInterceptors(FileInterceptor('image'))
    async register(@UploadedFile() image: Express.Multer.File, @Body(new ValidationPipe()) petData: CreatePetDto) {
    const uid = this.mascotasService.createPet(petData, image, 'pets');    
    return uid;
   }

   @Get()
   async getPet(
    @Query('page') page = '1', // Default to page 1 if not specified
    @Query('pageSize') pageSize = '5',// Default to page size of 10 if not specified
    @Query('lastDocumentId') lastDocumentId?: string
    ){ 
    const pageNumber = parseInt(page, 10);
    const pageSizeNumber = parseInt(pageSize, 10);
    const idDocument = pageNumber > 1 ? lastDocumentId : undefined;
    const pets = this.mascotasService.getPet(pageSizeNumber, idDocument);
    return pets;

   }

   @Put()
   @UseGuards(AuthGuardAdmin)
   @UseInterceptors(FileInterceptor('image'))
   async updatePet(@UploadedFile() image: Express.Multer.File, @Body(new ValidationPipe()) petData: UpdatePetDto){
    const pet = this.mascotasService.updateMascota(petData, image, 'pets');
    return pet;
   }

   @Delete(':id')
   @UseGuards(AuthGuardAdmin)
   async deletePet(@Param('id') id: string){
    const message = this.mascotasService.deletePetByDocId(id);
    return message;
   }
}
