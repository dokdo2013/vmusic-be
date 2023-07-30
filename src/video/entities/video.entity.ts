// create table vmusic.video
// (
//     id                   int                                          not null comment '노래영상 id'
//         primary key,
//     provider             enum ('youtube') default 'youtube'           not null comment '영상 제공',
//     provider_id          varchar(64)                                  not null comment '프로바이더 영상 id',
//     creator_id           int                                          not null comment '영상 올린 크리에이터 id',
//     title                text                                         not null comment '영상 제목',
//     thumbnaiil_image_url varchar(128)                                 null comment '썸네일 이미지 주소',
//     created_at           datetime         default current_timestamp() not null,
//     updated_at           datetime         default current_timestamp() not null
// )
//     comment '노래영상';

// create index video_creator_id_index
//     on vmusic.video (creator_id);

// create index video_title_index
//     on vmusic.video (title(768));

import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

// import { Creator } from './creator.entity';

@Table({
  tableName: 'video',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Video extends Model<Video> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    comment: '노래영상 id',
  })
  id: number;

  @Column({
    type: DataType.ENUM('youtube'),
    defaultValue: 'youtube',
    allowNull: false,
    comment: '영상 제공',
  })
  provider: string;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    comment: '프로바이더 영상 id',
  })
  provider_id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '영상 올린 크리에이터 id',
  })
  creator_id: number;

  // @BelongsTo(() => Creator)
  // creator: Creator;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    comment: '영상 제목',
  })
  title: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: true,
    comment: '썸네일 이미지 주소',
  })
  thumbnail_image_url: string;
}
