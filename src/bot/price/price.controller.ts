import { Controller, Get } from '@nestjs/common';
import { PriceService } from './price.service';

@Controller('price')
export class PriceController {
    constructor(private readonly service: PriceService) {}

    // TODO should probably be PUT
    @Get('stop')
    public stopService() {
        this.service.stop();
        return 'success';
    }

    @Get()
    public findAll() {
        return this.service.findAll();
    }
}
