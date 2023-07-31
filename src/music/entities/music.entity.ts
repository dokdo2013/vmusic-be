// create table vmusic.music
// (
//     id              int auto_increment comment '노래'
//         primary key,
//     name            varchar(64)                          not null comment '노래 이름',
//     author_id       int                                  not null comment '가수 id',
//     description     text                                 null comment '노래 설명',
//     cover_image_url varchar(128)                         null comment '노래 커버 이미지',
//     created_at      datetime default current_timestamp() not null,
//     updated_at      datetime default current_timestamp() not null
// )
//     comment '노래';

// create index music_author_id_index
//     on vmusic.music (author_id);

// create index music_name_index
//     on vmusic.music (name);

import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { Author } from './author.entity';

@Table({
  tableName: 'music',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Music extends Model<Music> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: '노래',
  })
  id: number;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    comment: '노래 이름',
  })
  name: string;

  @ForeignKey(() => Author)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '가수 id',
  })
  author_id: number;

  @BelongsTo(() => Author)
  author: Author;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: '노래 설명',
  })
  description: string;

  @Column({
    type: DataType.STRING(512),
    allowNull: true,
    comment: '노래 커버 이미지',
  })
  cover_image_url: string;
}
