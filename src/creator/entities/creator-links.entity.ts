// create table vmusic.creator_links
// (
//     id               int                                  not null comment '링크 id'
//         primary key,
//     creator_id       int                                  not null comment '크리에이터 id',
//     link_name        varchar(32)                          not null comment '링크 이름',
//     link_type        varchar(32)                          not null comment '링크 타입',
//     link_key         varchar(128)                         not null comment '링크 key',
//     link             varchar(512)                         not null comment '전체 링크',
//     link_description text                                 null comment '링크 설명',
//     created_at       datetime default current_timestamp() not null comment '생성일시',
//     updated_at       datetime default current_timestamp() not null comment '수정일시'
// )
//     comment '크리에이터 링크';

// create index creator_links_creator_id_index
//     on vmusic.creator_links (creator_id);

// create index creator_links_link_index
//     on vmusic.creator_links (link);

// create index creator_links_link_key_index
//     on vmusic.creator_links (link_key);

// create index creator_links_link_name_index
//     on vmusic.creator_links (link_name);

// create index creator_links_link_type_index
//     on vmusic.creator_links (link_type);

import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { Creator } from './creator.entity';

@Table({
  tableName: 'creator_links',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class CreatorLinks extends Model<CreatorLinks> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '링크 id',
  })
  id: number;

  @ForeignKey(() => Creator)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '크리에이터 id',
  })
  creator_id: number;

  @BelongsTo(() => Creator)
  creator: Creator;

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
    comment: '링크 설명',
  })
  link_description: string;
}
