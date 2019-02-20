import {
    BadRequestException,
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
        const result = this.service.findOne(periods);
        assertFound(result);
        return result.map(roundToTwoDecimalPlaces);
    }

    @Get('all')
    public findAll() {
        const mapAsDoubleArray = this.service.findAll();
        return mapAsDoubleArray.map(entry => [
            entry[0],
            entry[1].map(roundToTwoDecimalPlaces),
        ]);
    }

    @Post('create')
    public createMovingAverages(@Body() createMvaDto: CreateMovingAveragesDto) {
        try {
            this.service.create(createMvaDto.periods);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}

function roundToTwoDecimalPlaces(val: number): number {
    return Math.round(val * 100) / 100;
}

function assertFound(arg: any) {
    if (!arg) {
        throw new NotFoundException();
    }
}
