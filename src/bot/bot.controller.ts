import { Controller, Get } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
    constructor(private readonly service: BotService) {}

    // TODO should probably be DELETE
    @Get('drop')
    public drop() {
        this.service.drop();
        return 'success';
    }
}
