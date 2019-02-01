import { IsInt, IsString } from 'class-validator';

export class CreateCatDto {
    @IsInt()
    public readonly fluffiness: number;

    @IsString()
    public readonly color: string;
}
