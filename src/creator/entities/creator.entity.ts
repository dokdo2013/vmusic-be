// create table vmusic.creator
// (
//     id                int auto_increment
//         primary key,
//     name              varchar(64)                          not null comment '크리에이터 이름',
//     profile_image_url varchar(128)                         not null comment '크리에이터 프로필 이미지',
//     created_at        datetime default current_timestamp() not null,
//     updated_at        datetime default current_timestamp() not null
// )
//     comment '크리에이터';

// create index creator_name_index
//     on vmusic.creator (name);

import { Model, Table, Column, DataType } from 'sequelize-typescript';
import { CreateCreatorDto } from '../dto/create-creator.dto';

@Table({
  tableName: 'creator',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Creator extends Model<Creator, CreateCreatorDto> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    comment: '크리에이터 이름',
  })
  name: string;

  @Column({
    type: DataType.STRING(512),
    allowNull: false,
    comment: '크리에이터 프로필 이미지',
  })
  profile_image_url: string;
}
