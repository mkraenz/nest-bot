import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IDroppable } from '../common/i-droppable';
import { IPriceStreamProvider } from '../common/i-price-stream-provider';
import { PriceService } from '../price/price.service';
import { MovingAverages } from './moving-averages';

@Injectable()
export class MovingAveragesService implements IDroppable {
    private mvaMap = new Map<string, MovingAverages>();
    private mvaArraysMap = new Map<string, number[]>();
    private price$: Observable<number>;

    private readonly DEFAULT_PERIODS = 10;

    constructor(@Inject(PriceService) priceService: IPriceStreamProvider) {
        this.price$ = priceService.getPrice$();
        this.create('default', this.DEFAULT_PERIODS);
    }

    public findOne(key: string): number[] {
        return this.mvaArraysMap.get(key);
    }

    public findAll(): Array<[string, number[]]> {
        return [...this.mvaArraysMap];
    }

    public create(key: string, periods: number) {
        if (this.mvaMap.has(key)) {
            throw new Error(`key '${key}' already in use`);
        }

        const mva = new MovingAverages(this.price$, periods);
        const mvaArray: number[] = [];

        this.mvaMap.set(key, mva);
        this.mvaArraysMap.set(key, mvaArray);

        mva.getMva$().subscribe(average => mvaArray.push(average));
    }

    public drop() {
        this.mvaArraysMap.clear();
        this.mvaMap.clear();
    }
}
