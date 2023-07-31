import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Video } from './entities/video.entity';
import { VideoRequest } from './entities/video-request.entity';
import { Creator } from 'src/creator/entities/creator.entity';

@Module({
  imports: [SequelizeModule.forFeature([Video, VideoRequest, Creator])],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
