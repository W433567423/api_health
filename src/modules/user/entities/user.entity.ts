import { TimeEntity } from '@/modules/app/entities/app.entity';
import { DoctorEntity } from '@/modules/doctor/entities/doctor.entity';
import { AvatarsEntity } from '@/modules/file/entities/avatar.entity';
import { HospitalEntity } from '@/modules/hospital/entities/hospital.entity';
import { IndicatorEntity } from '@/modules/indicator/entities/indicator.entity';
import { InspectorEntity } from '@/modules/inspector/entities/inspector.entity';
import { ReviewerEntity } from '@/modules/reviewer/entities/reviewer.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity extends TimeEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '用户id' })
  id: number;

  @Column({ type: 'varchar', comment: '用户名', length: 20 })
  username: string;

  @Column({ type: 'varchar', comment: '密码(加密后)', length: 40 })
  password: string;

  @Column({ type: 'varchar', comment: '性别', length: 6, nullable: true })
  six?: string;

  @Column({ type: 'varchar', comment: '出生日期', length: 6, nullable: true })
  birthday?: string;

  @Column({ type: 'int', comment: '身高', nullable: true })
  height?: number;

  @Column({ type: 'int', comment: '体重', nullable: true })
  weight?: number;

  @Column({ type: 'varchar', comment: '真实姓名', nullable: true })
  real_name?: string;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '联系电话',
    length: 11,
  })
  phone?: string;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '电子邮件',
    length: 20,
  })
  email?: string;

  @Column({ type: 'varchar', comment: '省份', length: 10, nullable: true })
  province?: string;

  @Column({ type: 'varchar', comment: '城市', length: 10, nullable: true })
  city?: string;

  @Column({ type: 'varchar', comment: '详细地址', length: 40, nullable: true })
  address?: string;

  @Column({ type: 'varchar', comment: '身份证号', length: 18, nullable: true })
  card_id?: string;

  @Column({ type: 'varchar', comment: '民族', length: 10, nullable: true })
  nation?: string;

  @OneToOne(() => AvatarsEntity, (avatar) => avatar.user)
  avatar: AvatarsEntity;

  @OneToMany(() => HospitalEntity, (hospital) => hospital.user)
  hospitals: HospitalEntity[];

  @OneToMany(() => ReviewerEntity, (reviewer) => reviewer.user)
  reviewers: HospitalEntity[];

  @OneToMany(() => InspectorEntity, (inspector) => inspector.user)
  inspectors: InspectorEntity[];

  @OneToMany(() => DoctorEntity, (doctor) => doctor.user)
  doctors: DoctorEntity[];

  @OneToMany(() => IndicatorEntity, (indicator) => indicator.user)
  indicators: IndicatorEntity[];
}
