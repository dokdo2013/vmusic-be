// create table vmusic.video_request
// (
//     id                  int                                  not null comment '요청 id'
//         primary key,
//     user_id             int                                  not null comment '요청한 유저 id',
//     title               text                                 not null comment '요청 제목',
//     contents            longtext                             not null comment '요청 콘텐츠',
//     created_at          datetime default current_timestamp() not null,
//     is_processed        tinyint  default 0                   not null comment '처리 여부 (0: 요청, 1: 승인, 2: 거절)',
//     process_description text                                 null comment '처리 설명',
//     processed_at        datetime                             null comment '처리 일시'
// )
//     comment '영상 업로드 요청';

// create index video_request_user_id_index
//     on vmusic.video_request (user_id);

import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

// import { User } from './user.entity';

@Table({
  tableName: 'video_request',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class VideoRequest extends Model<VideoRequest> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    comment: '요청 id',
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '요청한 유저 id',
  })
  user_id: number;

  // @BelongsTo(() => User)
  // user: User;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    comment: '요청 제목',
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    comment: '요청 콘텐츠',
  })
  contents: string;

  @Column({
    type: DataType.TINYINT,
    defaultValue: 0,
    allowNull: false,
    comment: '처리 여부 (0: 요청, 1: 승인, 2: 거절)',
  })
  is_processed: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: '처리 설명',
  })
  process_description: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: '처리 일시',
  })
  processed_at: Date;
}
