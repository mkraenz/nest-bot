import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Res,
} from '@nestjs/common';
import { CreateMovingAveragesDto } from './create-moving-averages.dto';
import { DEFAULT_PERIODS } from './moving-averages.config';
import { MovingAveragesService } from './moving-averages.service';

@Controller('moving-averages')
export class MovingAveragesController {
    constructor(private service: MovingAveragesService) {}

    @Get()
    public findOneDefault(@Res() res) {
        res.redirect(`moving-averages/by-periods/${DEFAULT_PERIODS}`);
    }

    @Get('by-periods/:periods')
    public findOne(@Param('periods', new ParseIntPipe()) periods: number) {
        try {
            const result = this.service.findOne(periods);
            if (!result) {
                throw new NotFoundException();
            }
            return result.map(roundToTwoDecimalPlaces);
        } catch (error) {
            throw error;
        }
    }

    @Get('all')
    public findAll() {
        // todo round to two dec
        return this.service.findAll();
    }

    @Post('create')
    public createMovingAverages(@Body() createMvaDto: CreateMovingAveragesDto) {
        this.service.create(createMvaDto.periods);
    }
}

function roundToTwoDecimalPlaces(val: number): number {
    return Math.round(val * 100) / 100;
}
