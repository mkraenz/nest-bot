import { Test, TestingModule } from '@nestjs/testing';
import { PriceModule } from '../price/price.module';
import { MovingAveragesService } from './moving-averages.service';

describe('MovingAveragesService', () => {
    let service: MovingAveragesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MovingAveragesService],
            imports: [PriceModule],
        }).compile();

        service = module.get<MovingAveragesService>(MovingAveragesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
