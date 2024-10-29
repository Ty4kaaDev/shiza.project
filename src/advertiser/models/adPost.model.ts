import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    authorId: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @Column({
        default: 0,
    })
    subscriders: number;

    @Column({
        default: new Date(),
    })
    dateExit: Date = new Date();

    @Column({
        default: 'qweklfqweklf',
    })
    ytm: string = 'qweklfqweklf';

    @Column({
        default: 0,
    })
    cpm: number = 0;

    @Column()
    formatHour1: number;

    @Column()
    formatHour2: number;

    @Column({
        default: 0,
    })
    clicks: number = 0;
}
