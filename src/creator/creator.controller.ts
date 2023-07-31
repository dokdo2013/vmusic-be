import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreatorService } from './creator.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCreatorDto } from './dto/create-creator.dto';

@Controller('creator')
@ApiTags('creator')
export class CreatorController {
  constructor(private creatorService: CreatorService) {}

  @Get('id/:id')
  async getCreator(@Param('id', ParseIntPipe) id: number) {
    return await this.creatorService.getCreator(id);
  }

  @Get('id/:id/videos')
  async getCreatorVideos(@Param('id', ParseIntPipe) id: number) {
    return await this.creatorService.getCreatorVideos(id);
  }

  @Get('name/:name')
  async getCreatorByName(@Param('name') name: string) {
    return await this.creatorService.getCreatorByName(name);
  }

  @Get('name/:name/videos')
  async getCreatorVideosByName(@Param('name') name: string) {
    const user = await this.creatorService.getCreatorByName(name);

    return await this.creatorService.getCreatorVideos(user.id);
  }

  @Get('search/:keyword')
  async searchCreator(@Param('keyword') keyword: string) {
    return await this.creatorService.searchCreator(keyword);
  }

  @Post('')
  async createCreator(@Body() body: CreateCreatorDto) {
    return await this.creatorService.createCreator(body);
  }
}
