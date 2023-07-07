import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LeafStringAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;
}
