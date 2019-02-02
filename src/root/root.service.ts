import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    public getHello(): string {
        return 'Hello World!';
    }

    public onlyForAdmins(): string {
        return 'You are an admin. Astonishing!';
    }
}
