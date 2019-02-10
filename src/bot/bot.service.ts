import { Inject, Injectable } from '@nestjs/common';
import { IDroppable } from './common/i-droppable';
import { MovingAveragesService } from './moving-averages/moving-averages.service';
import { PriceService } from './price/price.service';

@Injectable()
export class BotService {
    constructor(
        @Inject(PriceService) private priceService: IDroppable,
        @Inject(MovingAveragesService) private mvaService: IDroppable,
    ) {}

    public drop() {
        this.priceService.drop();
        this.mvaService.drop();
    }
}
