import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiOutputInterceptor } from './common/api-response.interceptor';
import { CreatorModule } from './creator/creator.module';
import { MusicModule } from './music/music.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { BoardModule } from './board/board.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mariadb',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: false,
      timezone: 'Asia/Seoul',
    }),
    CreatorModule,
    MusicModule,
    UserModule,
    VideoModule,
    BoardModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiOutputInterceptor,
    },
  ],
})
export class AppModule {}
