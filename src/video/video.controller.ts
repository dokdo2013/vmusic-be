import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { CreateVideoRequestDto } from './dto/create-video-request.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('video')
@ApiTags('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get(':id')
  async getVideo(@Param('id') id: string) {
    return await this.videoService.getVideo(id);
  }

  @Get('search/:keyword')
  async searchVideo(@Param('keyword') keyword: string) {
    return await this.videoService.searchVideo(keyword);
  }

  @Post('')
  async createVideo(@Body() body: CreateVideoDto) {
    return await this.videoService.createVideo(body);
  }

  @Post('request')
  async requestVideo(@Body() body: CreateVideoRequestDto) {
    return await this.videoService.requestVideo(body);
  }
}
