// create table vmusic.board
// (
//     id                int auto_increment comment '게시판 id'
//         primary key,
//     board_key         varchar(32)                          not null comment '게시판 key',
//     board_name        varchar(32)                          not null comment '게시판 이름',
//     board_description text                                 null comment '게시판 설명',
//     is_admin          tinyint  default 0                   not null comment '관리자 전용 게시판',
//     board_master_id   int                                  not null comment '게시판 주인',
//     is_public         tinyint  default 1                   not null comment '게시판 공개여부',
//     created_at        datetime default current_timestamp() not null,
//     updated_at        datetime default current_timestamp() not null,
//     constraint board_pk2
//         unique (board_key)
// );

// create index board_board_key_index
//     on vmusic.board (board_key);

import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table({
  tableName: 'board',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Board extends Model<Board> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: '게시판 id',
  })
  id: number;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    comment: '게시판 key',
  })
  board_key: string;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    comment: '게시판 이름',
  })
  board_name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: '게시판 설명',
  })
  board_description: string;

  @Column({
    type: DataType.TINYINT,
    defaultValue: 0,
    allowNull: false,
    comment: '관리자 전용 게시판',
  })
  is_admin: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '게시판 주인',
  })
  board_master_id: number;

  @BelongsTo(() => User)
  board_master: User;

  @Column({
    type: DataType.TINYINT,
    defaultValue: 1,
    allowNull: false,
    comment: '게시판 공개여부',
  })
  is_public: number;
}
