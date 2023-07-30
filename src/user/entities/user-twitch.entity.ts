// create table vmusic.user_twitch
// (
//     id                   int                                  not null comment '트위치 id'
//         primary key,
//     user_id              int                                  not null comment '유저 테이블의 id',
//     twitch_name          varchar(64)                          not null comment '트위치 로그인 id',
//     twitch_display_name  int                                  not null comment '트위치 닉네임',
//     profile_image_url    varchar(128)                         not null,
//     broadcaster_type     varchar(32)                          null,
//     twitch_access_token  varchar(128)                         not null,
//     twitch_refresh_token varchar(128)                         not null,
//     created_at           datetime default current_timestamp() not null,
//     updated_at           datetime default current_timestamp() not null,
//     constraint user_twitch_pk2
//         unique (user_id)
// )
//     comment '트위치 Provider 유저';

// create index user_twitch_user_id_index
//     on vmusic.user_twitch (user_id);

import {
  Model,
  Table,
  Column,
  DataType,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { User } from './user.entity';

@Table({
  tableName: 'user_twitch',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class UserTwitch extends Model<UserTwitch> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    comment: '트위치 id',
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '유저 테이블의 id',
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    comment: '트위치 로그인 id',
  })
  twitch_name: string;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    comment: '트위치 닉네임',
  })
  twitch_display_name: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  profile_image_url: string;

  @Column({
    type: DataType.STRING(32),
    allowNull: true,
  })
  broadcaster_type: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  twitch_access_token: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  twitch_refresh_token: string;
}
