import { Controller, Get } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
    constructor(private readonly service: BotService) {}

    @Get('prices')
    public getPrices() {
        return this.service.getPrices();
    }
}
