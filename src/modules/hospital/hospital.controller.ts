import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IReqUser, type IResData } from '../app';
import {
  AddHospitalReqDto,
  DeleteHospitalReqDto,
} from './dtos/hospital.req.dto';
import { type HospitalEntity } from './entities/hospital.entity';
import { HospitalService } from './hospital.service';

@Controller('hospital')
@ApiBearerAuth('JWT-auth')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @ApiOperation({ summary: '获取已有医院列表' })
  @Get('getExistHospital')
  async getExistHospital(
    @Req() req: IReqUser,
  ): Promise<IResData<HospitalEntity[]>> {
    const userId = req.user.id;
    console.log('🚀 ~ HospitalController ~ userId:', userId);
    const hospitals = await this.hospitalService.getExistHospital(userId);
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
    return { msg: '添加医院成功', data: hospitals };
  }

  @ApiOperation({ summary: '删除一个医院' })
  @Delete('deleteHospital')
  async deleteHospital(
    @Req() req: IReqUser,
    @Param() param: DeleteHospitalReqDto,
  ): Promise<IResData<HospitalEntity[]>> {
    const userId = req.user.id;
    await this.hospitalService.deleteHospital(userId, param.hospitalId);
    const hospitals = await this.hospitalService.getExistHospital(userId);
    return { msg: '删除医院成功', data: hospitals };
  }
}
