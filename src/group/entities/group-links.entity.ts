// create table vmusic.group_links
// (
//     id               int                                  not null comment '링크 id'
//         primary key,
//     group_id         int                                  not null comment '그룹 id',
//     link_name        varchar(32)                          not null comment '링크 이름',
//     link_type        varchar(32)                          not null comment '링크 타입',
//     link_key         varchar(128)                         not null comment '링크 key',
//     link             varchar(512)                         not null comment '전체 링크',
//     link_description text                                 null comment '링크 설명',
//     created_at       datetime default current_timestamp() not null comment '생성일시',
//     updated_at       datetime default current_timestamp() not null comment '수정일시'
// )
//     comment '크리에이터 링크';

// create index group_links_group_id_index
//     on vmusic.group_links (group_id);

// create index group_links_link_index
//     on vmusic.group_links (link);

// create index group_links_link_key_index
//     on vmusic.group_links (link_key);

// create index group_links_link_name_index
//     on vmusic.group_links (link_name);

// create index group_links_link_type_index
//     on vmusic.group_links (link_type);

import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { Group } from './group.entity';

@Table({
  tableName: 'group_links',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class GroupLinks extends Model<GroupLinks> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '링크 id',
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

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    comment: '링크 이름',
  })
  link_name: string;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    comment: '링크 타입',
  })
  link_type: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    comment: '링크 key',
  })
  link_key: string;

  @Column({
    type: DataType.STRING(512),
    allowNull: false,
    comment: '전체 링크',
  })
  link: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: '링크 설명',
  })
  link_description: string;
}
