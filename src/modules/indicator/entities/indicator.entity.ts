import { TimeEntity } from '@/modules/app/entities/app.entity';
import { DoctorEntity } from '@/modules/doctor/entities/doctor.entity';
import { HospitalEntity } from '@/modules/hospital/entities/hospital.entity';
import { InspectorEntity } from '@/modules/inspector/entities/inspector.entity';
import { ReviewerEntity } from '@/modules/reviewer/entities/reviewer.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('indicator')
export class IndicatorEntity extends TimeEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '检查项目id' })
  id: number;

  @Column({ type: 'varchar', comment: '检查项目', length: 20 })
  indicator_name: string;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.indicators)
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorEntity;

  @ManyToOne(() => InspectorEntity, (inspector) => inspector.indicators)
  @JoinColumn({ name: 'inspector_id' })
  inspector: InspectorEntity;

  @ManyToOne(() => ReviewerEntity, (reviewer) => reviewer.indicators)
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: ReviewerEntity;

  @ManyToOne(() => HospitalEntity, (hospital) => hospital.indicators)
  @JoinColumn({ name: 'hospital_id' })
  hospital: HospitalEntity;

  @ManyToOne(() => UserEntity, (user) => user.indicators)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
