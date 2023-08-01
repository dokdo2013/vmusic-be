// create table vmusic.board_items
// (
//     id            int auto_increment comment '게시물 id'
//         primary key,
//     board_id      int                                  not null comment '게시판 id',
//     user_id       int                                  not null comment '작성자 id',
//     title         text                                 not null comment '게시물 제목',
//     contents      longtext                             not null comment '게시물 내용',
//     view_count    int      default 0                   not null comment '조회수',
//     comment_count int      default 0                   not null comment '댓글수',
//     like_count    int      default 0                   not null comment '추천수',
//     is_public     tinyint  default 1                   not null,
//     created_at    datetime default current_timestamp() not null,
//     updated_at    datetime default current_timestamp() not null,
//     is_deleted    tinyint  default 0                   not null,
//     deleted_at    datetime                             null
// )
//     comment '게시물';

// create index board_items_board_id_index
//     on vmusic.board_items (board_id);

// create index board_items_comment_count_index
//     on vmusic.board_items (comment_count);

// create index board_items_created_at_index
//     on vmusic.board_items (created_at);

// create index board_items_like_count_index
//     on vmusic.board_items (like_count);

// create index board_items_title_index
//     on vmusic.board_items (title(768));

// create index board_items_user_id_index
//     on vmusic.board_items (user_id);

// create index board_items_view_count_index
//     on vmusic.board_items (view_count);

import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Board } from './board.entity';
import { User } from 'src/user/entities/user.entity';

@Table({
  tableName: 'board_items',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class BoardItems extends Model<BoardItems> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: '게시물 id',
  })
  id: number;

  @ForeignKey(() => Board)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '게시판 id',
  })
  board_id: number;

  @BelongsTo(() => Board)
  board: Board;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '작성자 id',
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    comment: '게시물 제목',
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    comment: '게시물 내용',
  })
  contents: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    comment: '조회수',
  })
  view_count: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    comment: '댓글수',
  })
  comment_count: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    comment: '추천수',
  })
  like_count: number;

  @Column({
    type: DataType.TINYINT,
    defaultValue: 1,
  })
  is_public: number;

  @Column({
    type: DataType.TINYINT,
    defaultValue: 0,
  })
  is_deleted: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deleted_at: Date;
}
