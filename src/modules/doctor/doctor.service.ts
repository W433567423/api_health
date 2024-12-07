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
    newDoctor.doctorName = doctorName;
    newDoctor.six = six ?? '';
    newDoctor.hospitalId = hospitalId;
    newDoctor.userId = userId;
    await this.hospitalRepository.save(newDoctor);
  }

  // 删除一个医院
  async deleteDoctor(userId: number, doctorId: number) {
    await this.hospitalRepository.delete({ userId, id: doctorId });
    return await this.getExistDoctor(userId);
  }

  // 获取已有医院列表
  async getExistDoctor(userId: number) {
    const dbRes = await this.hospitalRepository.find({
      where: { userId },
    });

    return dbRes;
  }
}
