import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CreatorModule } from './creator/creator.module';
import { MusicModule } from './music/music.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(helmet());
  app.enableCors({
    origin: true,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Vmusic API')
    .setDescription('vmusic.kr 공식 API 문서입니다.')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
    include: [AppModule, CreatorModule, MusicModule, UserModule, VideoModule],
  });
  SwaggerModule.setup('apidocs', app, document);

  await app.listen(8000);
}
bootstrap();
