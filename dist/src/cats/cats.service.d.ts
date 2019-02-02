import { ICat } from './i-cat';
export declare class CatsService {
    private cats;
    create(cat: ICat): Promise<void>;
    findAll(): Promise<ICat[]>;
    findOne(id: number): Promise<ICat | null>;
}
