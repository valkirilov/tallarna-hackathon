import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Status } from './status.entity';
import { Leaf } from './leaf.entity';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Branch)
  @JoinColumn({ name: 'parent_id' })
  parent: Branch;

  // TODO: Temporary dirty hack so we can use the ORM to filter the branches by parent_id (without going for a query builder)
  @Column({ name: 'parent_id' })
  parentId: number | null;

  @OneToOne(() => Status)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @Column()
  name: string;

  @OneToMany(() => Branch, (branch) => branch.parent)
  @JoinColumn({ name: 'parent_id' })
  branches: Branch[];

  @OneToMany(() => Leaf, (leaf) => leaf.branch)
  leaves: Leaf[];

  @Column()
  order: number;
}
