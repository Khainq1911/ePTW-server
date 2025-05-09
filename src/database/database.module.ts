import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { TemplateEntity } from './entities/template.entity';
import { PermitEntity } from './entities/permit.entity';
import { PermitHistoryEntity } from './entities/permit-histories.entity';
import { FileEntity } from './entities/attachment-file.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [
          UserEntity,
          RoleEntity,
          TemplateEntity,
          PermitEntity,
          PermitHistoryEntity,
          FileEntity,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
