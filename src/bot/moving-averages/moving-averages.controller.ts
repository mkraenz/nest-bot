import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateMovingAveragesDto } from './create-moving-averages.dto';
import { MovingAveragesService } from './moving-averages.service';

@Controller('moving-averages')
export class MovingAveragesController {
    constructor(private service: MovingAveragesService) {}

    @Get()
    public findOneDefault(@Res() res) {
        res.redirect('moving-averages/default');
    }

    @Get(':key')
    public findOne(@Param('key') key: string) {
        return this.service.findOne(key).map(roundToTwoDecimalPlaces);
    }

    @Post('create')
    public createMovingAverages(@Body() createMvaDto: CreateMovingAveragesDto) {
        this.service.create(createMvaDto.key, createMvaDto.periods);
    }
}

function roundToTwoDecimalPlaces(val: number): number {
    return Math.round(val * 100) / 100;
}
