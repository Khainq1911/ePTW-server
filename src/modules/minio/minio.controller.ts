import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MinioService } from './minio.service';
import { Public } from 'src/common/decorators/public.decorators';
import { FileDto } from './minio.dto';

@Controller('upload')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Public()
  @Get()
  async getPresignPutUrl(@Query('fileName') fileName: string) {
    return await this.minioService.getPresignPutUrl(`uploads/${fileName}`);
  }

  @Public()
  @Post()
  async createFileAttachment(@Body() payload: FileDto) {
    return await this.minioService.createAttachmentFile(payload);
  }

  @Post('/remove-object')
  async deleteFile(@Body() fileName: string) {
    return await this.minioService.deleteFileMinio(fileName);
  }
}
