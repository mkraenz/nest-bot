import { Test, TestingModule } from '@nestjs/testing';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { MovingAveragesModule } from './moving-averages/moving-averages.module';
import { PriceModule } from './price/price.module';

describe('Bot Controller', () => {
    let controller: BotController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PriceModule, MovingAveragesModule],
            controllers: [BotController],
            providers: [BotService],
        }).compile();

        controller = module.get<BotController>(BotController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
