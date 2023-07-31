import { Injectable, NotFoundException } from '@nestjs/common';
import { VideoRequest } from './entities/video-request.entity';
import { Video } from './entities/video.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateVideoDto } from './dto/create-video.dto';
import { CreateVideoRequestDto } from './dto/create-video-request.dto';
import { Creator } from 'src/creator/entities/creator.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video) private readonly videoModel: typeof Video,
    @InjectModel(VideoRequest)
    private readonly videoRequestModel: typeof VideoRequest,
    @InjectModel(Creator) private readonly creatorModel: typeof Creator,
  ) {}

  async getVideos(): Promise<any> {
    return await this.videoModel.findAll({
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Creator,
          attributes: ['id', 'name', 'profile_image_url'],
        },
      ],
      limit: 120,
    });
  }

  async getVideo(id: string): Promise<any> {
    const video = await this.videoModel.findOne({
      where: { id },
      include: [
        {
          model: Creator,
          attributes: ['id', 'name', 'profile_image_url'],
        },
      ],
    });

    if (!video) {
      throw new NotFoundException('해당하는 영상이 없습니다.');
    }

    return video;
  }

  async searchVideo(keyword: string): Promise<any> {
    // like %keyword%
    const videos = await this.videoModel.findAll({
      where: { title: { [Op.like]: `%${keyword}%` } },
    });

    if (!videos) {
      throw new NotFoundException('해당하는 영상이 없습니다.');
    }

    return videos;
  }

  async createVideo(body: CreateVideoDto): Promise<any> {
    // 있으면 400
    const video = await this.videoModel.findOne({
      where: { title: body.title },
    });

    if (video) {
      throw new NotFoundException('이미 존재하는 영상입니다.');
    }

    return await this.videoModel.create(body);
  }

  async requestVideo(body: CreateVideoRequestDto): Promise<any> {
    return await this.videoRequestModel.create(body);
  }
}
