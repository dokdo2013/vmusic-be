import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MusicService } from './music.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMusicDto } from './dto/create-music.dto';

@Controller('music')
@ApiTags('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get(':id')
  async getMusic(@Param('id') id: string) {
    return await this.musicService.getMusic(id);
  }

  @Get('search/:keyword')
  async searchMusic(@Param('keyword') keyword: string) {
    return await this.musicService.searchMusic(keyword);
  }

  @Post('')
  async createMusic(@Body() body: CreateMusicDto) {
    return await this.musicService.createMusic(body);
  }
}
