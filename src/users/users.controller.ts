import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    public async findOneByToken(@Param() { token }: { token: string }) {
        return await this.userService.findOneByToken(token);
    }
}
