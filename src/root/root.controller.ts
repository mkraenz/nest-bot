import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../roles-guard/roles.decorator';
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

    @Get('authrequired')
    @UseGuards(AuthGuard('bearer'))
    public getOnlyIfAuthenticated(): string {
        return 'you are authenticated';
    }
}
