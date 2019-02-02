import { Module } from '@nestjs/common';
import { AppController } from './root.controller';
import { AppService } from './root.service';

@Module({
    controllers: [AppController],
    providers: [AppService],
})
export class RootModule {}
