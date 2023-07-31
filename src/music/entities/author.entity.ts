// create table vmusic.author
// (
//     id                int auto_increment
//         primary key,
//     name              varchar(64)                          not null comment '가수 이름',
//     profile_image_url varchar(128)                         null,
//     created_at        datetime default current_timestamp() not null,
//     updated_at        datetime default current_timestamp() not null
// )
//     comment '가수';

// create index author_name_index
//     on vmusic.author (name);

import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Music } from './music.entity';

@Table({
  tableName: 'author',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Author extends Model<Author> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    comment: '가수 이름',
  })
  name: string;

  @Column({
    type: DataType.STRING(512),
    allowNull: true,
    comment: '가수 프로필 이미지',
  })
  profile_image_url: string;
}
