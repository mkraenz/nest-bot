import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IDroppable } from '../common/i-droppable';
import { IPriceStreamProvider } from '../common/i-price-stream-provider';
import { PriceService } from '../price/price.service';
import { MovingAverages } from './moving-averages';
import { DEFAULT_PERIODS } from './moving-averages.config';

@Injectable()
export class MovingAveragesService implements IDroppable {
    private mvaMap = new Map<number, MovingAverages>();
    private mvaArraysMap = new Map<number, number[]>();
    private price$: Observable<number>;

    constructor(@Inject(PriceService) priceService: IPriceStreamProvider) {
        this.price$ = priceService.getPrice$();
        this.create(DEFAULT_PERIODS);
    }

    public findOne(periods: number): number[] {
        return this.mvaArraysMap.get(periods);
    }

    public findAll(): Array<[number, number[]]> {
        return [...this.mvaArraysMap];
    }

    public create(periods: number) {
        if (this.mvaMap.has(periods)) {
            throw new Error(`periods '${periods}' already exists`);
        }

        const mva = new MovingAverages(this.price$, periods);
        const mvaArray: number[] = [];

        this.mvaMap.set(periods, mva);
        this.mvaArraysMap.set(periods, mvaArray);

        mva.getMva$().subscribe(average => mvaArray.push(average));
    }

    public drop() {
        this.mvaArraysMap.clear();
        this.mvaMap.clear();
    }
}
