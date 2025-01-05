import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IReqUser, type IResData } from '../app';
import { AddIndicatorReqDto } from './dtos/indicator.req.dto';
import { IndicatorService } from './indicator.service';

@Controller('indicator')
@ApiBearerAuth('JWT-auth')
export class IndicatorController {
  constructor(private readonly indicatorService: IndicatorService) {}

  @ApiOperation({ summary: '添加一个指标' })
  @Post('addHospital')
  async addHospital(
    @Req() req: IReqUser,
    @Body() body: AddIndicatorReqDto,
  ): Promise<IResData<undefined>> {
    const userId = req.user.id;
    await this.indicatorService.addIndicator(userId, body);
    return { msg: '添加指标成功' };
  }
}
