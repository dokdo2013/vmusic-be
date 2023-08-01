import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Board } from './entities/board.entity';
import { BoardItems } from './entities/board-items.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Board, BoardItems, User])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
