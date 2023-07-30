// create table vmusic.user
// (
//     id         int auto_increment
//         primary key,
//     provider   enum ('twitch') default 'twitch'            not null comment '로그인 프로바이더',
//     name       varchar(64)                                 not null comment '유저 이름',
//     email      varchar(128)                                null comment '유저 이메일',
//     created_at datetime        default current_timestamp() not null,
//     updated_at datetime        default current_timestamp() not null,
//     is_deleted tinyint         default 0                   not null,
//     deleted_at datetime                                    null
// )
//     comment '유저';

// create index user_name_index
//     on vmusic.user (name);

import {
  Model,
  Table,
  Column,
  DataType,
  Sequelize,
} from 'sequelize-typescript';

@Table({
  tableName: 'user',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.ENUM('twitch'),
    defaultValue: 'twitch',
    allowNull: false,
    comment: '로그인 프로바이더',
  })
  provider: string;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    comment: '유저 이름',
  })
  name: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: true,
    comment: '유저 이메일',
  })
  email: string;
}
