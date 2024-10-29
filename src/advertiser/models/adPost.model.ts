import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Advertiser } from './advertiser.model';

@Entity()
export class AdPost {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Advertiser, (advertiser) => advertiser.id)
  advertiser: Advertiser;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  imageUrl: string;

  @Column()
  linkUrl: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}