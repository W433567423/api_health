import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { IReqUser, type IResData } from '../app';
import { DoctorService } from './doctor.service';
import { AddDoctorReqDto } from './dtos/doctor.req.dto';
import { type DoctorEntity } from './entities/doctor.entity';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @ApiOperation({ summary: '获取已有医生列表' })
  @Get('getExistDoctor')
  async getExistDoctor(
    @Req() req: IReqUser,
  ): Promise<IResData<DoctorEntity[]>> {
    const userId = req.user.id;
    const hospitals = await this.doctorService.getExistDoctor(userId);
    return { msg: '获取已有医生成功', data: hospitals };
  }

  @ApiOperation({ summary: '添加一个医生' })
  @Post('addDoctor')
  async addDoctor(
    @Req() req: IReqUser,
    @Body() body: AddDoctorReqDto,
  ): Promise<IResData<DoctorEntity[]>> {
    const userId = req.user.id;
    await this.doctorService.addDoctor(userId, body);
    const hospitals = await this.doctorService.getExistDoctor(userId);
    return { msg: '添加医生成功', data: hospitals };
  }
}
