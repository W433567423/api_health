import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { type AddDoctorReqDto } from './dtos/doctor.req.dto';
import { DoctorEntity } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly hospitalRepository: Repository<DoctorEntity>,
  ) {}

  // 添加一个医院
  async addDoctor(userId: number, body: AddDoctorReqDto) {
    const { doctorName, six, hospitalId } = body;
    const newDoctor = new DoctorEntity();
    newDoctor.doctor_name = doctorName;
    newDoctor.six = six ?? '';
    newDoctor.hospital_id = hospitalId;
    newDoctor.user_id = userId;
    await this.hospitalRepository.save(newDoctor);
  }

  // 删除一个医院
  async deleteDoctor(userId: number, doctorId: number) {
    await this.hospitalRepository.delete({ user_id: userId, id: doctorId });
    return await this.getExistDoctor(userId);
  }

  // 获取已有医院列表
  async getExistDoctor(userId: number) {
    const dbRes = await this.hospitalRepository.find({
      where: { user_id: userId },
    });

    return dbRes;
  }
}
