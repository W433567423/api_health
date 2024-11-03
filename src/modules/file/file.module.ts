import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AvatarsEntity } from './entities/avatar.entity';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([AvatarsEntity])],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
