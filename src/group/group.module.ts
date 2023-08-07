import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './entities/group.entity';
import { GroupLinks } from './entities/group-links.entity';
import { GroupMembers } from './entities/group-members.entity';

@Module({
  imports: [SequelizeModule.forFeature([Group, GroupLinks, GroupMembers])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
