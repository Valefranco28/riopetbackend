import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<string>  {
    return this.appService.saveDataCollection();
  }
}
 