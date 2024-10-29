import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    agreement: string;

    @Column()
    agreementNumber: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    budget: number;

    @Column()
    spent: number;
}
