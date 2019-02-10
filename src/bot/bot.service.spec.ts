import { SinonSpy, spy } from 'sinon';
import { BotService } from './bot.service';
import { IDroppable } from './common/i-droppable';

describe('BotService', () => {
    it('drop() delegates drop to sub-services', () => {
        const priceService: IDroppable = { drop: spy() };
        const mvaService: IDroppable = { drop: spy() };
        const service = new BotService(priceService, mvaService);

        service.drop();

        expect((priceService.drop as SinonSpy).calledOnce).toBe(true);
        expect((mvaService.drop as SinonSpy).calledOnce).toBe(true);
    });
});
