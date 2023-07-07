import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LeafRangeAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double' })
  min: number;

  @Column({ type: 'double' })
  max: number;
}
