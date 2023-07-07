import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LeafNumberAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double' })
  value: number;
}
