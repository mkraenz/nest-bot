import { Injectable, Optional } from '@nestjs/common';
import * as request from 'request-promise-native';
import { Observable, of, timer } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';

@Injectable()
export class BotService {
    private prices: number[] = [];

    constructor(
        @Optional() private url: string = 'http://localhost:3000/prices',
    ) {
        this.start();
    }

    public start() {
        const response$ = this.requestPrices(100);
        const price$ = this.parsePrices(response$);
        price$.subscribe(price => {
            this.prices.push(price);
        });
    }

    public getPrices() {
        return this.prices;
    }

    private requestPrices(pollIntervalInMs: number): Observable<string> {
        // TODO: error handling
        const timer$ = timer(0, pollIntervalInMs);
        const requestUrl$ = timer$.pipe(map(_ => this.url));
        const response$ = requestUrl$.pipe(flatMap(doRequest));
        return response$;
    }

    private parsePrices(response$: Observable<string>): Observable<number> {
        // TODO: error handling
        return response$.pipe(
            map(priceString => {
                return parseInt(priceString, 10);
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
