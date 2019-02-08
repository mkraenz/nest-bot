import {
    BadRequestException,
    Controller,
    Get,
    Param,
    Put,
} from '@nestjs/common';
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

    @Put('set-moving-average-size/:size')
    public setMovingAverageSize(@Param() { size }: { size: string }) {
        try {
            return this._setMovingAverageSize(size);
        } catch (error) {
            throw error;
        }
    }

    private _setMovingAverageSize(size: string): string {
        const buffersize = parseInt(size, 10);
        if (buffersize < 1) {
            throw new BadRequestException('size must be a positive integer');
        }
        this.service.setBufferSize(buffersize);
        return `Successfully set moving average size to ${buffersize}`;
    }
}

function roundToTwoDecimalPlaces(val: number): number {
    return Math.round(val * 100) / 100;
}
