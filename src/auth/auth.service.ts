import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService) {}

    public async validateUser(token: string): Promise<boolean> {
        return !!(await this.usersService.findOneByToken(token));
    }
}
