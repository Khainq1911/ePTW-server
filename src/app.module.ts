import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/auth/guard/role.guard';
import { AuthGuard } from './modules/auth/guard/auth.guard';
import { TemplateModule } from './modules/template/template.module';
import { MailModule } from './modules/mail/mail.module';
import { PermitModule } from './modules/permit/permit.module';
import { UserModule } from './modules/user/user.module';
import { StatusHistoryModule } from './modules/history/history.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { MinioModule } from './modules/minio/minio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    TemplateModule,
    MailModule,
    PermitModule,
    UserModule,
    StatusHistoryModule,
    DashboardModule,
    TelegramModule,
    MinioModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
