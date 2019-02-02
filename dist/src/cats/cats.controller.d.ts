import { CatsService } from './cats.service';
import { CreateCatDto } from './create-cat.dto';
import { ICat } from './i-cat';
export declare class CatsController {
    private readonly service;
    constructor(service: CatsService);
    createCat(asdf: CreateCatDto): Promise<void>;
    findAll(): Promise<ICat[]>;
    findOne({ id }: {
        id: number;
    }): Promise<ICat>;
}
