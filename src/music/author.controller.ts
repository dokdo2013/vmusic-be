import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('author')
@ApiTags('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get(':id')
  async getMusic(@Param('id') id: string) {
    return await this.authorService.getAuthor(id);
  }

  @Get('search/:keyword')
  async searchAuthor(@Param('keyword') keyword: string) {
    return await this.authorService.searchAuthor(keyword);
  }

  @Post('')
  async createAuthor(@Body() body: CreateAuthorDto) {
    return await this.authorService.createAuthor(body);
  }
}
