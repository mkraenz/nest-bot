import { Controller, Get } from '@nestjs/common';
import { MockPricesService } from './mock-prices.service';

@Controller('mock-price')
export class MockPricesController {
    constructor(private readonly service: MockPricesService) {}

    @Get()
    public getPrices(): number {
        return this.service.getRandomPriceStep();
    }
}
