// create table vmusic.group_members
// (
//     id          int auto_increment
//         primary key,
//     group_id    int                                  not null comment '그룹 id',
//     member_id   int                                  not null comment '멤버 id',
//     description text                                 null,
//     join_at     datetime                             null comment '가입일시',
//     leave_at    datetime                             null comment '탈퇴일시',
//     created_at  datetime default current_timestamp() not null comment '등록일시',
//     updated_at  datetime default current_timestamp() not null
// )
//     comment '그룹 멤버 모음';

// create index group_members_group_id_index
//     on vmusic.group_members (group_id);

// create index group_members_member_id_index
//     on vmusic.group_members (member_id);

import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { Group } from './group.entity';
import { Creator } from 'src/creator/entities/creator.entity';

@Table({
  tableName: 'group_members',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class GroupMembers extends Model<GroupMembers> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '그룹 멤버 id',
  })
  id: number;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '그룹 id',
  })
  group_id: number;

  @BelongsTo(() => Group)
  group: Group;

  @ForeignKey(() => Creator)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '멤버 id',
  })
  member_id: number;

  @BelongsTo(() => Creator)
  member: Creator;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: '멤버 설명',
  })
  description: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: '가입일시',
  })
  join_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: '탈퇴일시',
  })
  leave_at: Date;
}
