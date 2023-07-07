import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LeafType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
