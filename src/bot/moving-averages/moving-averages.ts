import { Observable } from 'rxjs';
import { bufferCount, map } from 'rxjs/operators';

export class MovingAverages {
    private mva$: Observable<number>;

    constructor(price$: Observable<number>, private periods: number) {
        this.mva$ = price$.pipe(
            bufferCount(this.periods, 1),
            map(average),
        );
    }

    public getMva$() {
        return this.mva$;
    }
}

function average(prices: number[]): number {
    const sum = prices.reduce((acc, current) => acc + current, 0);
    return sum / prices.length;
}
