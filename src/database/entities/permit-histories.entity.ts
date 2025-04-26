import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'permit_status_histories' })
export class PermitHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'changed_by', type: 'int', nullable: false })
  changedBy: number; 

  @Column({ name: 'permit_id', type: 'int', nullable: false })
  permitId: number;

  @Column({ name: 'status', type: 'varchar', default: 'Pending' })
  status: string;

  @Column({ name: 'reason', type: 'text', nullable: false })
  reason: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

 
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'changed_by' }) 
  user?: UserEntity;
}
