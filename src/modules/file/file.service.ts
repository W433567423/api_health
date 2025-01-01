import { uploadFile } from '@/utils/cos.utils';
import { isExistDir } from '@/utils/fs.utile';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Repository } from 'typeorm';
import { IReqUser } from '../app';
import { type UserEntity } from '../user/entities/user.entity';
import { AvatarsEntity } from './entities/avatar.entity';

@Injectable({ scope: Scope.REQUEST })
export class FileService {
  constructor(
    @Inject(REQUEST) private readonly request: IReqUser,
    @InjectRepository(AvatarsEntity)
    private readonly avatarRepository: Repository<AvatarsEntity>,
  ) {}

  // 上传用户头像
  async uploadAvatar(user: UserEntity, file: Express.Multer.File) {
    // 上传到cos
    const filePath = path.resolve(
      `src/../.uploads/${String(user.id)}_${String(file.fieldname)}`,
    );

    const uploadPath = 'src/../.uploads';
    isExistDir(uploadPath);

    fs.writeFileSync(filePath, file.buffer);
    const { Location } = await uploadFile({
      Key: `graduation/avatar/${user.id}-avatar.png`,
      FilePath: filePath,
    });
    fs.rmSync(filePath);

    const dbAvatar = await this.avatarRepository.findOne({
      where: {
        file_url: Location,
      },
    });
    if (dbAvatar !== null) {
      // 更新数据库中的数据
      dbAvatar.size = String(file.size) + 'bit';
      dbAvatar.mime_type = file.mimetype;
      dbAvatar.file_url = Location;
      await this.avatarRepository.update(dbAvatar.id, dbAvatar);
      return dbAvatar;
    } else {
      // new avatar实体
      const avatar = new AvatarsEntity();
      avatar.size = String(file.size) + 'bit';
      avatar.mime_type = file.mimetype;
      avatar.file_url = Location;

      return await this.avatarRepository.save(avatar);
    }
  }
}
