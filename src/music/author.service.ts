import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author) private readonly authorModel: typeof Author,
  ) {}

  async getAuthor(id: string): Promise<any> {
    const author = await this.authorModel.findOne({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException('해당하는 가수가 없습니다.');
    }

    return author;
  }

  async searchAuthor(name: string): Promise<any> {
    // like %name%
    const authors = await this.authorModel.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
    });

    if (!authors) {
      throw new NotFoundException('해당하는 가수가 없습니다.');
    }

    return authors;
  }

  async createAuthor(body: CreateAuthorDto): Promise<any> {
    // 있으면 400
    const author = await this.authorModel.findOne({
      where: { name: body.name },
    });

    if (author) {
      throw new NotFoundException('이미 존재하는 가수입니다.');
    }

    return await this.authorModel.create(body);
  }
}
