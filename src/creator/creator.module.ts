import { Module } from '@nestjs/common';
import { CreatorController } from './creator.controller';
import { CreatorService } from './creator.service';
import { Creator } from './entities/creator.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Video } from 'src/video/entities/video.entity';

@Module({
  imports: [SequelizeModule.forFeature([Creator, Video])],
  controllers: [CreatorController],
  providers: [CreatorService],
})
export class CreatorModule {}
