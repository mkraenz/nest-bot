import { Module } from '@nestjs/common';
import { PriceModule } from '../price/price.module';
import { MovingAveragesController } from './moving-averages.controller';
import { MovingAveragesService } from './moving-averages.service';

@Module({
    controllers: [MovingAveragesController],
    providers: [MovingAveragesService],
    imports: [PriceModule],
    exports: [MovingAveragesService],
})
export class MovingAveragesModule {}
