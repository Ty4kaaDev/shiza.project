import { IsObject, IsString } from 'class-validator';

export class CreatePostDTO {
    @IsString()
    name: string;

    @IsString()
    url: string;

    @IsObject()
    formatHour: {
        formatHour1: number;
        formatHour2: number;
    };
}
