import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import { MinioController } from './minio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from 'src/database/entities/attachment-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [MinioService],
  controllers: [MinioController],
  exports: [MinioService],
})
export class MinioModule {}
