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
import { DoctorService } from './doctor.service';
import { AddDoctorReqDto, DeleteDoctorReqDto } from './dtos/doctor.req.dto';
import { type DoctorEntity } from './entities/doctor.entity';

@Controller('doctor')
@ApiBearerAuth('JWT-auth')
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
    const doctors = await this.doctorService.getExistDoctor(userId);
    return { msg: '添加医生成功', data: doctors };
  }

  @ApiOperation({ summary: '删除一个医生' })
  @Delete('deleteDoctor/:doctorId')
  async deleteDoctor(
    @Req() req: IReqUser,
    @Param() param: DeleteDoctorReqDto,
  ): Promise<IResData<DoctorEntity[]>> {
    const userId = req.user.id;
    await this.doctorService.deleteDoctor(userId, param.doctorId);
    const doctors = await this.doctorService.getExistDoctor(userId);
    return { msg: '删除医生成功', data: doctors };
  }
}
