import { UserEntity } from '@/modules/user/entities/user.entity';
import {
  eqPassword,
  eqValidNumber,
  eqValidString,
  md5Password,
} from '@/utils/handlePassword';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IReqUser } from '../app';
import { type AvatarsEntity } from '../file/entities/avatar.entity';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @Inject(REQUEST) private readonly request: IReqUser,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly jwtService: JwtService,
  ) {}

  // 用户名查询用户
  async isExistByName(userName: string, status: 'login' | 'registry') {
    const user = await this.userRepository.findOne({ where: { userName } });
    if (status === 'login' && user !== null) {
      throw new HttpException('该用户名尚未注册', HttpStatus.FORBIDDEN);
    }
    if (status === 'registry' && user !== null) {
      throw new HttpException('该用户名已被注册', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  // 注册服务
  async registry(
    userName: string,
    originPassword: string,
    emailValid: string,
    validServer: number,
    email: string,
  ) {
    eqValidNumber(Number(emailValid), validServer);

    // 查询该用户名是否注册
    await this.isExistByName(userName, 'registry');

    const password = md5Password(originPassword);
    // 新建用户
    const dbUser = await this.userRepository.save({
      userName,
      password,
      email,
    });

    // 登录
    return {
      user: dbUser,
      token: await this.jwtService.signAsync({
        id: dbUser.id,
        userName: dbUser.userName,
      }),
    };
  }

  // 登录服务
  async login(
    userName: string,
    password: string,
    codeValid: string,
    validServer: string,
  ) {
    eqValidString(codeValid, validServer);

    // 查询该用户名是否注册
    const dbUser = await this.isExistByName(userName, 'login');
    if (dbUser !== null) {
      // 比较密码
      eqPassword(dbUser.password, md5Password(password));

      // 登录
      return {
        user: dbUser,
        token: await this.jwtService.signAsync({
          id: dbUser.id,
          userName: dbUser.userName,
        }),
      };
    } else {
      throw new HttpException('该用户名尚未注册', HttpStatus.FORBIDDEN);
    }
  }

  // 忘记密码
  async forget(
    email: string,
    newPassword: string,
    emailValid: string,
    validServer: number,
  ) {
    eqValidNumber(Number(emailValid), validServer);

    // 查询该用户名是否注册
    const dbUser = await this.userRepository.findOne({
      where: { email },
    });

    if (dbUser === null) {
      throw new HttpException('该邮箱尚未被绑定', HttpStatus.FORBIDDEN);
    } else {
      await this.userRepository.update(dbUser.id, {
        password: md5Password(newPassword),
      });
    }
  }

  // 获取用户
  async getUser() {
    if (this.request.user?.id === undefined) {
      console.log('用户id不存在');
      throw new HttpException('未登录', HttpStatus.UNAUTHORIZED);
    }
    const user = await this.userRepository.findOneBy({
      id: this.request.user?.id,
    });
    if (user === null) {
      // 理论上不可能
      console.log('找不到用户');
      throw new HttpException('该用户名不存在', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  // 更新用户头像
  async updateUserAvatar(avatar: AvatarsEntity) {
    if (this.request.user?.id === undefined) {
      throw new HttpException('未登录', HttpStatus.UNAUTHORIZED);
    }
    const userId = this.request.user.id;
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['avatar'],
    });
    if (user === null) {
      throw new HttpException('该用户不存在', HttpStatus.UNAUTHORIZED);
    } else {
      user.avatar = avatar;
      return await this.userRepository.update(userId, user);
    }
  }
}
