import { Module } from '@nestjs/common';
import { UserModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { HttpStrategy } from './http.strategy';

@Module({
    imports: [UserModule],
    providers: [AuthService, HttpStrategy],
})
export class AuthModule {}
