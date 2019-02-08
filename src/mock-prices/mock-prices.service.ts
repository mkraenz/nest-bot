import { Injectable } from '@nestjs/common';

@Injectable()
export class MockPricesService {
    private lastPrice: number = rng(500)();

    public getRandomPriceStep(): number {
        const plusOrMinus = Math.pow(-1, rng(2)());
        const step = plusOrMinus * rng(this.lastPrice)() * 0.01;
        this.lastPrice = this.lastPrice + step;
        this.lastPrice = this.lastPrice > 1 ? this.lastPrice : 1;
        return this.lastPrice;
    }
}

function rng(max: number) {
    return () => Math.floor(Math.random() * max);
}
