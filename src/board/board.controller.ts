import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';

@Controller('board')
@ApiTags('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('')
  @ApiOperation({
    summary: '게시판 목록 조회',
    description: '게시판 목록을 조회합니다.',
  })
  async getBoards() {
    return await this.boardService.getBoards();
  }

  @Get(':id')
  @ApiOperation({
    summary: '게시판 조회',
    description: '게시판을 조회합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '게시판 id',
    type: String,
  })
  async getBoard(@Param('id') id: string) {
    return await this.boardService.getBoard(id);
  }

  @Get(':id/post')
  @ApiOperation({
    summary: '게시판 글 목록 조회',
    description: '게시판 글 목록을 조회합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '게시판 id',
    type: Number,
  })
  async getBoardPosts(@Param('id') id: string) {
    return await this.boardService.getBoardPosts(id);
  }

  @Get(':id/post/:postId')
  @ApiOperation({
    summary: '게시물 조회',
    description: '게시물을 조회합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '게시판 id',
    type: Number,
  })
  @ApiParam({
    name: 'postId',
    description: '게시물 id',
    type: Number,
  })
  async getBoardPost(
    @Param('id') id: string,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return await this.boardService.getBoardPost(id, postId);
  }
}
