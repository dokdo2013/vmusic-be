import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@Controller('author')
@ApiTags('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get(':id')
  @ApiOperation({
    summary: '가수 정보 조회',
    description: '가수 id를 이용하여 가수 정보를 조회합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '가수 id',
    type: String,
  })
  async getAuthor(@Param('id') id: string) {
    return await this.authorService.getAuthor(id);
  }

  @Get('search/:keyword')
  @ApiOperation({
    summary: '가수 정보 검색',
    description: '가수 이름을 이용하여 가수 정보를 검색합니다.',
  })
  @ApiParam({
    name: 'keyword',
    description: '가수 이름',
    type: String,
  })
  async searchAuthor(@Param('keyword') keyword: string) {
    return await this.authorService.searchAuthor(keyword);
  }

  @Post('')
  @ApiOperation({
    summary: '가수 정보 생성',
    description: '가수 정보를 생성합니다.',
  })
  @ApiBody({
    type: CreateAuthorDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createAuthor(@Body() body: CreateAuthorDto) {
    return await this.authorService.createAuthor(body);
  }
}
