import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RoleEntity } from './role.entity';
import { Exclude } from 'class-transformer';
import { PermitHistoryEntity } from './permit-histories.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'phone', unique: true, nullable: false })
  phone: string;

  @Column({ name: 'telegram_id', unique: true, nullable: true })
  telegramId: string;

  @Column({ name: 'email', unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column({ name: 'password', nullable: false })
  password: string;

  @Exclude()
  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @Column({ name: 'role_id', type: 'int', default: 1, nullable: false })
  roleId: number;

  @ManyToOne(() => RoleEntity, role => role.users)
  @JoinColumn({ name: 'role_id' })
  role?: RoleEntity;

  @OneToMany(() => PermitHistoryEntity, history => history.changedBy)
  histories: PermitHistoryEntity[];
}
