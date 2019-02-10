import { Subject } from 'rxjs';
import { MovingAverages } from './moving-averages';

describe('MovingAverages', () => {
    it('mva$ does nothing until enough data', async () => {
        //  'enough data' means #data points = `periods`
        const price$ = new Subject<number>();
        const periods = 3;
        const mva$ = new MovingAverages(price$, periods).getMva$();

        mva$.subscribe(_ => {
            fail('observable should not have emitted');
        });

        price$.next(123);
        price$.next(234);
    });

    it('mva$ emits correct average', async done => {
        const price$ = new Subject<number>();
        const periods = 4;
        const mva$ = new MovingAverages(price$, periods).getMva$();

        mva$.subscribe(val => {
            expect(val).toBe((123 + 234 + 345 + 456) / periods);
            done();
        });

        price$.next(123);
        price$.next(234);
        price$.next(345);
        price$.next(456); // emit
    });
});
