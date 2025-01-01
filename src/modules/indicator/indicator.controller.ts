import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { IReqUser, type IResData } from '../app';
import { AddIndicatorReqDto } from './dtos/indicator.req.dto';
import { type IndicatorEntity } from './entities/indicator.entity';
import { IndicatorService } from './indicator.service';

@Controller('indicator')
export class IndicatorController {
  constructor(private readonly indicatorService: IndicatorService) {}

  @ApiOperation({ summary: '添加一个指标' })
  @Post('addHospital')
  async addHospital(
    @Req() req: IReqUser,
    @Body() body: AddIndicatorReqDto,
  ): Promise<IResData<IndicatorEntity[]>> {
    const userId = req.user.id;
    await this.indicatorService.addIndicator(userId, body);
    const indicators = await this.indicatorService.getExistIndicator(userId);
    return { msg: '添加指标成功', data: indicators };
  }
}
