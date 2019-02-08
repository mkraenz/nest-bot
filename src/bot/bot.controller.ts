import { Controller, Get } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
    constructor(private readonly service: BotService) {}

    @Get('prices')
    public getPrices() {
        return this.service.getPrices();
    }

    @Get('moving-averages')
    public getMovingAverages() {
        return this.service.getMovingAverages().map(roundToTwoDecimalPlaces);
    }

    // TODO should probably be PUT
    @Get('stop')
    public stopService() {
        this.service.stop();
        return 'success';
    }

    // TODO should probably be DELETE
    @Get('reset')
    public reset() {
        this.service.reset();
        return 'success';
    }
}

function roundToTwoDecimalPlaces(val: number): number {
    return Math.round(val * 100) / 100;
}
