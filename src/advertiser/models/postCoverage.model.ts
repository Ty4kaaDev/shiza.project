import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AdPost } from './ad-post.model';

@Entity()
export class PostCoverage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AdPost, (adPost) => adPost.id)
  adPost: AdPost;

  @Column()
  coverage: number;

  @Column()
  impressions: number;

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