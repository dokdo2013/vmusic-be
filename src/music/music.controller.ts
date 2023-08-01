import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MusicService } from './music.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMusicDto } from './dto/create-music.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@Controller('music')
@ApiTags('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get(':id')
  @ApiOperation({
    summary: '노래 정보 조회',
    description: '노래 id를 이용하여 노래 정보를 조회합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '노래 id',
    type: String,
  })
  async getMusic(@Param('id') id: string) {
    return await this.musicService.getMusic(id);
  }

  @Get(':id/videos')
  @ApiOperation({
    summary: '노래에 해당되는 video 조회',
    description: '노래 id를 이용하여 노래에 해당되는 video를 조회합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '노래 id',
    type: String,
  })
  async getMusicVideos(@Param('id') id: string) {
    return await this.musicService.getMusicVideos(id);
  }

  @Get('search/:keyword')
  @ApiOperation({
    summary: '노래 정보 검색',
    description: '노래 이름을 이용하여 노래 정보를 검색합니다.',
  })
  @ApiParam({
    name: 'keyword',
    description: '노래 이름',
    type: String,
  })
  async searchMusic(@Param('keyword') keyword: string) {
    return await this.musicService.searchMusic(keyword);
  }

  @Post('')
  @ApiOperation({
    summary: '노래 정보 생성',
    description: '노래 정보를 생성합니다.',
  })
  @ApiBody({
    type: CreateMusicDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createMusic(@Body() body: CreateMusicDto) {
    return await this.musicService.createMusic(body);
  }
}
