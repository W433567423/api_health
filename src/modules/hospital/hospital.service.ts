import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { type AddHospitalReqDto } from './dtos/hospital.req.dto';
import { HospitalEntity } from './entities/hospital.entity';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(HospitalEntity)
    private readonly hospitalRepository: Repository<HospitalEntity>,
  ) {}

  // 添加一个医院
  async addHospital(userId: number, body: AddHospitalReqDto) {
    const { hospitalName, addressCode, alias, level } = body;
    const newHospital = new HospitalEntity();
    newHospital.hospitalName = hospitalName;
    newHospital.addressCode = addressCode;
    newHospital.alias = alias ?? '';
    newHospital.level = level;
    newHospital.user_id = userId;
    newHospital.nature = body?.nature ?? '未知';
    await this.hospitalRepository.save(newHospital);
  }

  // 获取已有医院列表
  async getExistHospital(userId: number) {
    const dbRes = await this.hospitalRepository.find({
      where: { user_id: userId },
    });

    return dbRes;
  }
}
