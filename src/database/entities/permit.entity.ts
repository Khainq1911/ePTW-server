import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'permits' })
export class PermitEntity extends BaseEntity {
  @Column({ name: 'company_name', type: 'varchar', nullable: false })
  companyName: string;

  @Column({ name: 'applicant_id', type: 'integer', nullable: false })
  applicantId: number;

  @Column({ name: 'template_id', type: 'integer', nullable: false })
  templateId: number;

  @Column({ name: 'people_number', type: 'integer', nullable: false })
  peopleNumber: number;

  @Column({ name: 'work_activities', type: 'text', nullable: false })
  workActivities: string;

  @Column({ name: 'equipments', type: 'text', nullable: false })
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
}
