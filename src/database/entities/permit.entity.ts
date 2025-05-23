import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TemplateEntity } from './template.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'permits' })
export class PermitEntity extends BaseEntity {
  @Column({ name: 'company_name', type: 'varchar', nullable: false })
  companyName: string;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'sender_id', type: 'integer', nullable: false })
  senderId: number;

  @Column({ name: 'receiver_id', type: 'integer', nullable: false })
  receiverId: number;

  @Column({ name: 'template_id', type: 'integer', nullable: false })
  templateId: number;

  @Column({ name: 'people_number', type: 'integer', nullable: false })
  peopleNumber: number;

  @Column({ name: 'work_activities', type: 'text', nullable: true })
  workActivities: string;

  @Column({ name: 'equipments', type: 'text', nullable: true })
  equipments: string;

  @Column({ name: 'location', type: 'text', nullable: true })
  location: string;

  @Column({
    name: 'start_time',
    type: 'timestamp without time zone',
    nullable: false,
  })
  startTime: string;

  @Column({
    name: 'end_time',
    type: 'timestamp without time zone',
    nullable: false,
  })
  endTime: string;

  @Column({ name: 'status', type: 'varchar', default: 'Pending' })
  status: string;

  @Column({ name: 'data', type: 'jsonb', nullable: false })
  data: any;

  @ManyToOne(() => TemplateEntity, template => template.permits)
  @JoinColumn({ name: 'template_id' })
  template: TemplateEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'sender_id' })
  sender: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'receiver_id' })
  receiver: UserEntity;
}
