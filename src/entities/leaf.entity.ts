import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Branch } from './branch.entity';
import { Status } from './status.entity';
import { LeafType } from './leafType.entity';

@Entity()
export class Leaf {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Branch)
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @OneToOne(() => Status)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @OneToOne(() => LeafType)
  @JoinColumn({ name: 'leaf_type_id' })
  leafType: LeafType;

  // TODO: This should be a polymorphic relationship
  @Column({ name: 'leaf_attribute_id' })
  leafAttributeId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  order: number;
}
