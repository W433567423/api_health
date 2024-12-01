import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { IReqUser, type IResData } from '../app';
import { AddHospitalReqDto } from './dtos/hospital.req.dto';
import { type HospitalEntity } from './entities/hospital.entity';
import { HospitalService } from './hospital.service';

@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @ApiOperation({ summary: '获取已有医院列表' })
  @Get('getExistHospital')
  async getExistHospital(
    @Req() req: IReqUser,
  ): Promise<IResData<HospitalEntity[]>> {
    const userId = req.user.id;
    const hospitals = await this.hospitalService.getExistHospital(userId);
    console.log('🚀 ~ HospitalController ~ getExistHospital ~ userId:', userId);
    return { msg: '获取已有医院成功', data: hospitals };
  }

  @ApiOperation({ summary: '添加一个医院' })
  @Post('addHospital')
  async addHospital(
    @Req() req: IReqUser,
    @Body() body: AddHospitalReqDto,
  ): Promise<IResData<HospitalEntity[]>> {
    const userId = req.user.id;
    await this.hospitalService.addHospital(userId, body);
    const hospitals = await this.hospitalService.getExistHospital(userId);
    console.log('🚀 ~ HospitalController ~ getExistHospital ~ userId:', userId);
    return { msg: '添加医院成功', data: hospitals };
  }
}
