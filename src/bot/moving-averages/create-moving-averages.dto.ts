import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateMovingAveragesDto {
    @IsInt()
    @IsPositive()
    public readonly periods: number;

    @IsString()
    public readonly key: string;
}
