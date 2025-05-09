import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'attachment_files' })
export class FileEntity extends BaseEntity {
  @Column({ name: 'file_name', type: 'varchar', nullable: false })
  fileName: string;

  @Column({ name: 'bucket', type: 'varchar', nullable: false })
  bucket: string;

  @Column({ name: 'file_path', type: 'text', nullable: false })
  filePath: string;

  @Column({ name: 'permit_id', type: 'integer', nullable: false })
  permitId: number;
}
