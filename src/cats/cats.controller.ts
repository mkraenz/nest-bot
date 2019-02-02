import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './create-cat.dto';
import { ICat } from './i-cat';

@Controller('cats')
export class CatsController {
    constructor(private readonly service: CatsService) {}

    @Post()
    public async createCat(@Body() asdf: CreateCatDto) {
        this.service.create(asdf);
    }

    @Get()
    public async findAll(): Promise<ICat[]> {
        return this.service.findAll();
    }

    @Get(':id')
    public async findOne(@Param() { id }: { id: number }): Promise<ICat> {
        const cat = await this.service.findOne(id);
        if (!cat) {
            throw new NotFoundException();
        }
        return cat;
    }
}
