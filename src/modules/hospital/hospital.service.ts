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
    newHospital.hospital_name = hospitalName;
    newHospital.address_code = addressCode;
    newHospital.alias = alias ?? '';
    newHospital.level = level;
    newHospital.user_id = userId;
    newHospital.nature = body?.nature ?? '未知';
    await this.hospitalRepository.save(newHospital);
  }

  // 删除一个医院
  async deleteHospital(userId: number, hospitalId: number) {
    await this.hospitalRepository.delete({ user_id: userId, id: hospitalId });
    return await this.getExistHospital(userId);
  }

  // 获取已有医院列表
  async getExistHospital(userId: number) {
    const dbRes = await this.hospitalRepository.find({
      where: { user_id: userId },
    });

    return dbRes;
  }
}
