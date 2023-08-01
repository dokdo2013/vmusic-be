import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreatorService } from './creator.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@Controller('creator')
@ApiTags('creator')
export class CreatorController {
  constructor(private creatorService: CreatorService) {}

  @Get('id/:id')
  @ApiOperation({
    summary: '크리에이터 정보 조회',
    description: '크리에이터 id를 이용하여 크리에이터 정보를 조회합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '크리에이터 id',
    type: Number,
  })
  async getCreator(@Param('id', ParseIntPipe) id: number) {
    return await this.creatorService.getCreator(id);
  }

  @Get('id/:id/videos')
  @ApiOperation({
    summary: '크리에이터의 영상 조회',
    description: '크리에이터 id를 이용하여 크리에이터의 영상을 조회합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '크리에이터 id',
    type: Number,
  })
  async getCreatorVideos(@Param('id', ParseIntPipe) id: number) {
    return await this.creatorService.getCreatorVideos(id);
  }

  @Get('name/:name')
  @ApiOperation({
    summary: '크리에이터 정보 조회',
    description: '크리에이터 이름을 이용하여 크리에이터 정보를 조회합니다.',
  })
  @ApiParam({
    name: 'name',
    description: '크리에이터 이름',
    type: String,
  })
  async getCreatorByName(@Param('name') name: string) {
    return await this.creatorService.getCreatorByName(name);
  }

  @Get('name/:name/videos')
  @ApiOperation({
    summary: '크리에이터의 영상 조회',
    description: '크리에이터 이름을 이용하여 크리에이터의 영상을 조회합니다.',
  })
  @ApiParam({
    name: 'name',
    description: '크리에이터 이름',
    type: String,
  })
  async getCreatorVideosByName(@Param('name') name: string) {
    const user = await this.creatorService.getCreatorByName(name);

    return await this.creatorService.getCreatorVideos(user.id);
  }

  @Get('search/:keyword')
  @ApiOperation({
    summary: '크리에이터 검색',
    description: '크리에이터를 검색합니다. (like 검색)',
  })
  @ApiParam({
    name: 'keyword',
    description: '검색어',
    type: String,
  })
  async searchCreator(@Param('keyword') keyword: string) {
    return await this.creatorService.searchCreator(keyword);
  }

  @Post('')
  @ApiOperation({
    summary: '크리에이터 생성',
    description: '크리에이터를 생성합니다.',
  })
  @ApiBody({
    type: CreateCreatorDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createCreator(@Body() body: CreateCreatorDto) {
    return await this.creatorService.createCreator(body);
  }
}
