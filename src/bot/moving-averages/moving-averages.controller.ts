import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import { CreateMovingAveragesDto } from './create-moving-averages.dto';
import { MovingAveragesService } from './moving-averages.service';

@Controller('moving-averages')
export class MovingAveragesController {
    constructor(private service: MovingAveragesService) {}

    @Get()
    public findOneDefault(@Res() res) {
        res.redirect('moving-averages/by-key/default');
    }

    @Get('by-key/:key')
    public findOne(@Param('key') key: string) {
        const result = this.service.findOne(key);
        if (!result) {
            throw new NotFoundException();
        }
        return result.map(roundToTwoDecimalPlaces);
    }

    @Get('all')
    public findAll() {
        return this.service.findAll();
    }

    @Post('create')
    public createMovingAverages(@Body() createMvaDto: CreateMovingAveragesDto) {
        this.service.create(createMvaDto.key, createMvaDto.periods);
    }
}

function roundToTwoDecimalPlaces(val: number): number {
    return Math.round(val * 100) / 100;
}
