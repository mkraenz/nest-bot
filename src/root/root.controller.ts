import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/roles-guard/roles.decorator';
import { AppService } from './root.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    public getHello(): string {
        return this.appService.getHello();
    }

    @Get('admin')
    @Roles('admin')
    public getAdminHello(): string {
        return this.appService.onlyForAdmins();
    }
}
