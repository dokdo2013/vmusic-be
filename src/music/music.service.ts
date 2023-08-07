import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Music } from './entities/music.entity';
import { Author } from './entities/author.entity';
import { Op } from 'sequelize';
import { CreateMusicDto } from './dto/create-music.dto';
import { Video } from 'src/video/entities/video.entity';
import { Creator } from 'src/creator/entities/creator.entity';

@Injectable()
export class MusicService {
  constructor(
    @InjectModel(Music) private readonly musicModel: typeof Music,
    @InjectModel(Author) private readonly authorModel: typeof Author,
    @InjectModel(Video) private readonly videoModel: typeof Video,
    @InjectModel(Creator) private readonly creatorModel: typeof Creator,
  ) {}

  async getMusic(id: string): Promise<any> {
    // FIXME: 외래키 걸어주세요~

    const music = (await this.musicModel.findOne({
      where: { id },
      raw: true,
    })) as any;

    if (!music) {
      throw new NotFoundException('해당하는 노래가 없습니다.');
    }

    const author = await this.authorModel.findOne({
      where: { id: music.author_id },
      raw: true,
    });

    music.author = author;

    return music;
  }

  async searchMusic(keyword: string): Promise<any> {
    // like %keyword%
    const musics = await this.musicModel.findAll({
      where: { name: { [Op.like]: `%${keyword}%` } },
      raw: true,
    });

    if (!musics) {
      throw new NotFoundException('해당하는 노래가 없습니다.');
    }

    return musics;
  }

  async getMusicVideos(id: string): Promise<any> {
    const music = await this.musicModel.findOne({
      where: { id },
    });

    if (!music) {
      throw new NotFoundException('해당하는 노래가 없습니다.');
    }

    const videos = await this.videoModel.findAll({
      where: { music_id: id },
      include: [
        {
          model: this.musicModel,
          attributes: ['id', 'name', 'cover_image_url'],
        },
        // {
        //   model: this.creatorModel,
        //   attributes: ['id', 'name', 'profile_image_url'],
        // },
      ],
    });

    return videos;
  }

  async createMusic(body: CreateMusicDto): Promise<any> {
    // 있으면 400
    const music = await this.musicModel.findOne({
      where: { name: body.name },
    });

    if (music) {
      throw new NotFoundException('이미 존재하는 노래입니다.');
    }

    return await this.musicModel.create(body);
  }
}
