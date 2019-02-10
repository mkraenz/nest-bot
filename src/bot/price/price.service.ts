import { Injectable, Optional } from '@nestjs/common';
import * as request from 'request-promise-native';
import { AsyncSubject, interval, Observable } from 'rxjs';
import { flatMap, map, takeUntil } from 'rxjs/operators';
import { IDroppable } from '../common/i-droppable';
import { IPriceStreamProvider } from '../common/i-price-stream-provider';

@Injectable()
export class PriceService implements IPriceStreamProvider, IDroppable {
    private price$: Observable<number>;
    private prices: number[] = [];
    private stop$ = new AsyncSubject();

    constructor(
        @Optional() private url: string = 'http://localhost:3000/mock-price',
    ) {
        this.start();
    }

    public drop() {
        this.prices.splice(0, this.prices.length);
    }

    public getPrice$(): Observable<number> {
        return this.price$;
    }

    public findAll(): number[] {
        return this.prices;
    }

    public stop() {
        this.stop$.next('stop-signal');
        this.stop$.complete();
    }

    private start() {
        const response$ = this.requestPrices(100);
        this.price$ = this.parsePrices(response$);
        this.price$.subscribe(price => this.prices.push(price));
    }

    private requestPrices(pollIntervalInMs: number): Observable<string> {
        const interval$ = interval(pollIntervalInMs);
        const requestUrl$ = interval$.pipe(
            map(_ => this.url),
            takeUntil(this.stop$),
        );
        const response$ = requestUrl$.pipe(flatMap(doRequest));
        return response$;
    }

    private parsePrices(response$: Observable<string>): Observable<number> {
        return response$.pipe(map(priceString => parseInt(priceString, 10)));
    }
}

async function doRequest(url: string) {
    try {
        const res = await request(url);
        return res as string;
    } catch (error) {
        // do nothing
    }
}
