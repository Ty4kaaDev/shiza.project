import { IsString } from 'class-validator';

export class RegisterUserDTO {
    @IsString()
    login: string;

    @IsString()
    password: string;
}
