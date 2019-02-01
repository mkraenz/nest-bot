import { Injectable } from '@nestjs/common';
import { ICat } from './i-cat';

@Injectable()
export class CatsService {
    private cats: ICat[] = [{ fluffiness: 23, color: 'grey' }];

    public async create(cat: ICat) {
        this.cats.push(cat);
    }

    public async findAll(): Promise<ICat[]> {
        return this.cats;
    }
    public async findOne(id: number): Promise<ICat | null> {
        return id < this.cats.length ? this.cats[id] : null;
    }
}
