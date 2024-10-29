import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface UserJwt {
    sub: number;
    iat: number;
    exp: number;
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    login: string

    @Column()
    password: string

    @Column({
        default: 0,
    })
    balance: number = 0
} 