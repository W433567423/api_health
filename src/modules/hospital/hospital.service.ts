import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HospitalEntity } from './entities/hospital.entity';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(HospitalEntity)
    private readonly hospitalRepository: Repository<HospitalEntity>,

    @InjectRepository(HospitalEntity)
    private readonly userRepository: Repository<HospitalEntity>,
  ) {}

  async getExistHospital(userId: number) {
    const dbRes = await this.hospitalRepository.find({
      where: { user_id: userId },
    });
    console.log('🚀 ~ HospitalService ~ getExistHospital ~ userId:', userId);

    return dbRes;
  }
}
