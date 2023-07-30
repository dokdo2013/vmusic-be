import { Module } from '@nestjs/common';
import { CreatorController } from './creator.controller';
import { CreatorService } from './creator.service';
import { Creator } from './entities/creator.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Creator])],
  controllers: [CreatorController],
  providers: [CreatorService],
})
export class CreatorModule {}
