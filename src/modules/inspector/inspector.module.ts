import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectorEntity } from './entities/inspector.entity';
import { InspectorController } from './inspector.controller';
import { InspectorService } from './inspector.service';

@Module({
  imports: [TypeOrmModule.forFeature([InspectorEntity])],
  controllers: [InspectorController],
  providers: [InspectorService],
})
export class InspectorModule {}
