import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,

} from 'typeorm';

@Entity({ name: 'permit_status_histories' })
export class PermitHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'changed_by', type: 'integer', nullable: false })
  changedBy: number;

  @Column({ name: 'permit_id', type: 'integer', nullable: false })
  permitId: number;

  @Column({ name: 'status', type: 'varchar', default: 'Pending' })
  status: string;

  @Column({ name: 'reason', type: 'text', nullable: false })
  reason: string;

  @CreateDateColumn()
  created_at: Date;
}
