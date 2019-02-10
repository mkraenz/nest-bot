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

    it('mva$ with periods = 1 mimics price$', async done => {
        const price$ = new Subject<number>();
        const periods = 1;
        const mva$ = new MovingAverages(price$, periods).getMva$();

        let callCount = 0;
        mva$.subscribe(val => {
            switch (callCount) {
                case 0:
                    callCount++;
                    expect(val).toBe(123);
                    break;
                case 1:
                    callCount++;
                    expect(val).toBe(234);
                    break;
                case 2:
                    expect(val).toBe(345);
                    done();
            }
        });

        price$.next(123); // case 0
        price$.next(234); // case 1
        price$.next(345); // case 2
    });
});
