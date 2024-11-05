import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewerEntity } from './entities/reviewer.entity';
import { ReviewerController } from './reviewer.controller';
import { ReviewerService } from './reviewer.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewerEntity])],
  controllers: [ReviewerController],
  providers: [ReviewerService],
})
export class ReviewerModule {}
