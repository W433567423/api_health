import { Controller, Get, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { IReqUser, type IResData } from '../app';
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
    return { msg: '获取医院成功', data: hospitals };
  }
}
