import { Injectable, Optional } from '@nestjs/common';
import * as request from 'request-promise-native';
import { AsyncSubject, interval, Observable } from 'rxjs';
import { bufferCount, flatMap, map, takeUntil } from 'rxjs/operators';

@Injectable()
export class BotService {
    private prices: number[] = [];
    private movingAverages: number[] = [];

    private bufferSize = 3;
    private stop$ = new AsyncSubject();

    constructor(
        @Optional() private url: string = 'http://localhost:3000/prices',
    ) {
        this.start();
    }

    public start() {
        const response$ = this.requestPrices(100);
        const price$ = this.parsePrices(response$);
        price$.subscribe(prices => this.prices.push(prices[0]));
        price$.subscribe(prices => this.movingAverages.push(average(prices)));
    }

    public stop() {
        this.stop$.next('stop-signal');
        this.stop$.complete();
    }

    public getPrices() {
        return this.prices;
    }

    public getMovingAverages() {
        return this.movingAverages;
    }

    public setBufferSize(newSize: number) {
        this.bufferSize = newSize;
    }

    public reset() {
        this.prices = [];
        this.movingAverages = [];
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

    private parsePrices(response$: Observable<string>): Observable<number[]> {
        return response$.pipe(
            bufferCount(this.bufferSize, 1),
            map(lastThreePrices => {
                return lastThreePrices.map(priceString =>
                    parseInt(priceString, 10),
                );
            }),
        );
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

function average(prices: number[]): number {
    const sum = prices.reduce((acc, current) => acc + current);
    return sum / prices.length;
}
