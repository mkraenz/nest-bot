import { Test, TestingModule } from '@nestjs/testing';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';

describe('Bot Controller', () => {
    let controller: BotController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BotController],
            providers: [BotService],
        }).compile();

        controller = module.get<BotController>(BotController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('getMovingAverages() should return empty array', () => {
        expect(controller.getMovingAverages()).toEqual([]);
    });

    it('getPrices() should return empty array', () => {
        expect(controller.getPrices()).toEqual([]);
    });
});
