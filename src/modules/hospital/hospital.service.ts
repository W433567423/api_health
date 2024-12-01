import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { type IHospital } from '.';
import { HospitalEntity } from './entities/hospital.entity';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(HospitalEntity)
    private readonly hospitalRepository: Repository<HospitalEntity>,
  ) {}

  // 添加一个医院
  async addHospital(userId: number, body: IHospital) {
    const { hospitalName, addressCode, alias, level } = body;
    const newHospital = new HospitalEntity();
    newHospital.hospital_name = hospitalName;
    newHospital.address_code = addressCode;
    newHospital.alias = alias;
    newHospital.level = level;
    newHospital.user_id = userId;
    await this.hospitalRepository.save(newHospital);
  }

  // 获取已有医院列表
  async getExistHospital(userId: number) {
    const dbRes = await this.hospitalRepository.find({
      where: { user_id: userId },
    });
    console.log('🚀 ~ HospitalService ~ getExistHospital ~ userId:', userId);

    return dbRes;
  }
}
