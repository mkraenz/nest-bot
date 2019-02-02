import { Injectable } from '@nestjs/common';
import { IUser } from './i-user';

@Injectable()
export class UserService {
    public async findOneByToken(token: string): Promise<IUser | null> {
        if (token) {
            return { name: 'horst', roles: ['admin'] };
        }
        return null;
    }
}
