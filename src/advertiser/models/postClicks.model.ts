import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity()
export class PostClicks {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AdPost, (adPost) => adPost.id)
  adPost: AdPost;

  @Column()
  clicks: number;

  @Column()
  ctr: number;

  @Column()
  cpc: number;

  @Column()
  cpv: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}