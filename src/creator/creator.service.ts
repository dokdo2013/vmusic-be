import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Creator } from './entities/creator.entity';
import { Op } from 'sequelize';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { Video } from 'src/video/entities/video.entity';

@Injectable()
export class CreatorService {
  constructor(
    @InjectModel(Creator) private readonly creatorModel: typeof Creator,
    @InjectModel(Video) private readonly videoModel: typeof Video,
  ) {}

  async getCreator(id: number): Promise<any> {
    const creator = await this.creatorModel.findOne({
      where: { id },
    });

    if (!creator) {
      throw new NotFoundException('해당하는 크리에이터가 없습니다.');
    }

    return creator;
  }

  async getCreatorByName(name: string): Promise<any> {
    const creator = await this.creatorModel.findOne({
      where: { name },
    });

    if (!creator) {
      throw new NotFoundException('해당하는 크리에이터가 없습니다.');
    }

    return creator;
  }

  async getCreatorVideos(id: number): Promise<any> {
    const creator = await this.creatorModel.findOne({
      where: { id },
    });

    if (!creator) {
      throw new NotFoundException('해당하는 크리에이터가 없습니다.');
    }

    const videos = await this.videoModel.findAll({
      where: { creator_id: id },
      include: [Creator],
    });

    return videos;
  }

  async searchCreator(name: string): Promise<any> {
    // like %name%
    const creators = await this.creatorModel.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
    });

    if (!creators) {
      throw new NotFoundException('해당하는 크리에이터가 없습니다.');
    }

    return creators;
  }

  async createCreator(body: CreateCreatorDto): Promise<any> {
    // 있으면 400
    const creator = await this.creatorModel.findOne({
      where: { name: body.name },
    });

    if (creator) {
      throw new BadRequestException('이미 존재하는 크리에이터입니다.');
    }

    const createdCreator = await this.creatorModel.create(body);

    return createdCreator;
  }
}
