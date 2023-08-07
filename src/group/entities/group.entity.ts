// create table vmusic.`group`
// (
//     id                int auto_increment comment '그룹 id'
//         primary key,
//     name              varchar(128)                         not null comment '그룹 이름',
//     profile_image_url varchar(512)                         null comment '프로필 이미지 url',
//     created_at        datetime default current_timestamp() not null comment '생성일시',
//     updated_at        datetime default current_timestamp() not null
// )
//     comment '그룹';

// create index group_name_index
//     on vmusic.`group` (name);

import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({
  tableName: 'group',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Group extends Model<Group> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '그룹 id',
  })
  id: number;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    comment: '그룹 이름',
  })
  name: string;

  @Column({
    type: DataType.STRING(512),
    allowNull: true,
    comment: '프로필 이미지 url',
  })
  profile_image_url: string;
}
