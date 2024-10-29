import { IsNumber, IsObject, IsString } from "class-validator";

export class RUserDTO {
    @IsNumber()
    id: number

    @IsString()
    login: string

    @IsNumber()
    balance: number

}

export class RUserJwtDTO {
    @IsObject()
    user: RUserDTO

    @IsString()
    token: string
}