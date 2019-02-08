import { Module } from '@nestjs/common';
import { MockPricesController } from './mock-prices.controller';
import { MockPricesService } from './mock-prices.service';

@Module({
    controllers: [MockPricesController],
    providers: [MockPricesService],
})
export class MockPricesModule {}
