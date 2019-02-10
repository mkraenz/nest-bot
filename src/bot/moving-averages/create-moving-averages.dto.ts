import { IsInt, IsPositive } from 'class-validator';

export class CreateMovingAveragesDto {
    @IsInt()
    @IsPositive()
    public readonly periods: number;
}
