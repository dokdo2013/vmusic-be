import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatorService } from './creator.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCreatorDto } from './dto/create-creator.dto';

@Controller('creator')
@ApiTags('creator')
export class CreatorController {
  constructor(private creatorService: CreatorService) {}

  @Get('id/:id')
  async getCreator(@Param('id') id: string) {
    return await this.creatorService.getCreator(id);
  }

  @Get('name/:name')
  async getCreatorByName(@Param('name') name: string) {
    return await this.creatorService.getCreatorByName(name);
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
