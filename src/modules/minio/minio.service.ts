import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';
import { FileDto } from './minio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from 'src/database/entities/attachment-file.entity';
import { Repository } from 'typeorm';

const bucketName = 'attachment-files';

@Injectable()
export class MinioService {
  private readonly minioClient: Client;
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    private readonly configService: ConfigService
  ) {
    this.minioClient = new Client({
      endPoint: this.configService.get<string>('MINIO_HOST') || 'localhost',
      port: this.configService.get<number>('MINIO_PORT'),
      useSSL: false,
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY'),
    });
  }

  async getPresignPutUrl(objectName: string) {
    const bucketExist = await this.minioClient.bucketExists(bucketName);

    if (!bucketExist) {
      await this.minioClient.makeBucket(bucketName);
    }

    const expireTime = 60 * 60;

    const url = await this.minioClient.presignedPutObject(bucketName, objectName, expireTime);

    return { url };
  }

  async createAttachmentFile(fileInfo: FileDto) {
    const payload = {
      bucket: bucketName,
      fileName: fileInfo.fileName,
      filePath: `uploads/${fileInfo.fileName}`,
      permitId: fileInfo.permitId,
    };

    await this.fileRepository.save(payload);

    return { message: 'success' };
  }

  async deleteFileMinio(objectName: string) {
    await this.minioClient.removeObject(bucketName, `uploads/${objectName}`);
    return { message: 'success' };
  }
}
