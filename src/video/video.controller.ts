import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { CreateVideoRequestDto } from './dto/create-video-request.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@Controller('video')
@ApiTags('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('')
  @ApiOperation({
    summary: '비디오 리스트 조회',
    description: '비디오 리스트를 조회합니다.',
  })
  async getVideos() {
    return await this.videoService.getVideos();
  }

  @Get(':id')
  @ApiOperation({
    summary: '비디오 정보 조회',
    description: '비디오 id를 이용하여 비디오 정보를 조회합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '비디오 id',
    type: String,
  })
  async getVideo(@Param('id') id: string) {
    return await this.videoService.getVideo(id);
  }

  @Get('search/:keyword')
  @ApiOperation({
    summary: '비디오 정보 검색',
    description: '비디오 이름을 이용하여 비디오 정보를 검색합니다. (like 검색)',
  })
  async searchVideo(@Param('keyword') keyword: string) {
    return await this.videoService.searchVideo(keyword);
  }

  @Post('')
  @ApiOperation({
    summary: '비디오 생성',
    description: '비디오를 생성합니다.',
  })
  @ApiBody({
    type: CreateVideoDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createVideo(@Body() body: CreateVideoDto) {
    return await this.videoService.createVideo(body);
  }

  @Post('request')
  @ApiOperation({
    summary: '비디오 등록 요청',
    description: '비디오 등록을 요청합니다.',
  })
  @ApiBody({
    type: CreateVideoRequestDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async requestVideo(@Body() body: CreateVideoRequestDto) {
    return await this.videoService.requestVideo(body);
  }
}
