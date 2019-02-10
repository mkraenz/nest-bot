import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { MovingAveragesModule } from './moving-averages/moving-averages.module';
import { PriceModule } from './price/price.module';

@Module({
    imports: [PriceModule, MovingAveragesModule],
    controllers: [BotController],
    providers: [BotService],
})
export class BotModule {}
