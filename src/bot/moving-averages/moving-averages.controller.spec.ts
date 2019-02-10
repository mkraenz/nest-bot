import { Test, TestingModule } from '@nestjs/testing';
import { PriceModule } from '../price/price.module';
import { MovingAveragesController } from './moving-averages.controller';
import { MovingAveragesService } from './moving-averages.service';

describe('MovingAverages Controller', () => {
    let controller: MovingAveragesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MovingAveragesController],
            providers: [MovingAveragesService],
            imports: [PriceModule],
        }).compile();

        controller = module.get<MovingAveragesController>(
            MovingAveragesController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
