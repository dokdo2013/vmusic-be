import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { Music } from './entities/music.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from './entities/author.entity';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { Video } from 'src/video/entities/video.entity';
import { Creator } from 'src/creator/entities/creator.entity';

@Module({
  imports: [SequelizeModule.forFeature([Music, Author, Video, Creator])],
  controllers: [MusicController, AuthorController],
  providers: [MusicService, AuthorService],
})
export class MusicModule {}
