import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PermitEntity } from './permit.entity';

@Entity({ name: 'templates' })
export class TemplateEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ type: 'varchar', name: 'img_url', nullable: true })

  imgUrl: string;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @Column({ type: 'jsonb', name: 'fields' })
  fields: any;

  @OneToMany(() => PermitEntity, (permit) => permit.template)
  permits: PermitEntity[]
}
