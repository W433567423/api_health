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

  @Column({ type: 'varchar', comment: '检查项目名称', length: 20 })
  indicator_name: string;

  @Column({ type: 'varchar', comment: '检验号', length: 20 })
  indicator_num: string;

  @Column({ type: 'varchar', comment: '检查结果', length: 20 })
  indicator_result: string;

  @Column({
    type: 'timestamp',
    comment: '检查时间(s)',
    default: () => 'CURRENT_TIMESTAMP',
  })
  indicator_time: Date;

  @Column({ type: 'varchar', comment: '指标单位', length: 10, nullable: true })
  unit?: string;

  @Column({
    type: 'varchar',
    comment: '指标最小值',
    length: 20,
    nullable: true,
  })
  mix?: string;

  @Column({
    type: 'varchar',
    comment: '指标最大值',
    length: 20,
    nullable: true,
  })
  max?: string;

  @Column({ type: 'varchar', comment: '检查方式', length: 20, nullable: true })
  indicator_type?: string;

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
