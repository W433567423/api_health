import { Injectable } from '@nestjs/common';
import { type AddIndicatorReqDto } from './dtos/indicator.req.dto';
import { type IndicatorEntity } from './entities/indicator.entity';

@Injectable()
export class IndicatorService {
  async addIndicator(userId: number, body: AddIndicatorReqDto): Promise<void> {
    console.log('🚀 ~ IndicatorService ~ addIndicator ~ body:', body);
    // TODO
  }

  async getExistIndicator(userId: number): Promise<IndicatorEntity[]> {
    // TODO
    return [];
  }
}
