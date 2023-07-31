import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CreatorModule } from './creator/creator.module';
import { MusicModule } from './music/music.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
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
