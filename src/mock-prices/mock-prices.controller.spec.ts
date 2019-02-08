import { Test, TestingModule } from '@nestjs/testing';
import { MockPricesController } from './mock-prices.controller';
import { MockPricesService } from './mock-prices.service';

describe('MockPrices Controller', () => {
    let controller: MockPricesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MockPricesController],
            providers: [MockPricesService],
        }).compile();

        controller = module.get<MockPricesController>(MockPricesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getPrices()', () => {
        it('should return a positive number', () => {
            expect(typeof controller.getPrices()).toBe('number');
            expect(controller.getPrices()).toBeGreaterThan(0);
        });
    });
});
