import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Board } from './entities/board.entity';
import { BoardItems } from './entities/board-items.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board) private boardModel: typeof Board,
    @InjectModel(BoardItems) private boardItemsModel: typeof BoardItems,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async getBoards(): Promise<any> {
    const boards = await this.boardModel.findAll({});

    return boards;
  }

  async getBoard(id: string): Promise<any> {
    const board = await this.boardModel.findOne({
      where: { board_key: id },
    });

    if (!board) {
      throw new NotFoundException('해당하는 게시판이 없습니다.');
    }

    return board;
  }

  async getBoardPosts(id: string): Promise<any> {
    const board = await this.boardModel.findOne({
      where: { board_key: id },
    });

    if (!board) {
      throw new NotFoundException('해당하는 게시판이 없습니다.');
    }

    const boardItems = await this.boardItemsModel.findAll({
      where: { board_id: board.id },
      include: [User],
      order: [['id', 'DESC']],
    });

    return boardItems;
  }

  async getBoardPost(id: string, postId: number): Promise<any> {
    const board = await this.boardModel.findOne({
      where: { board_key: id },
    });

    if (!board) {
      throw new NotFoundException('해당하는 게시판이 없습니다.');
    }

    const boardItem = await this.boardItemsModel.findOne({
      where: { board_id: board.id, id: postId },
      include: [User],
      order: [['id', 'DESC']],
    });

    if (!boardItem) {
      throw new NotFoundException('해당하는 게시글이 없습니다.');
    }

    return boardItem;
  }
}
