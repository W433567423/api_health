import { TimeEntity } from '@/modules/app/entities/app.entity';
import { DoctorEntity } from '@/modules/doctor/entities/doctor.entity';
import { AvatarsEntity } from '@/modules/file/entities/avatar.entity';
import { HospitalEntity } from '@/modules/hospital/entities/hospital.entity';
import { InspectorEntity } from '@/modules/inspector/entities/inspector.entity';
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
  user_name: string;

  @Column({ type: 'varchar', comment: '密码(加密后)', length: 20 })
  password: string;

  @Column({ type: 'varchar', comment: '性别', length: 6 })
  six: string;

  @Column({ type: 'varchar', comment: '出生日期', length: 6 })
  birthday: string;

  @Column({ type: 'int', comment: '身高' })
  height: number;

  @Column({ type: 'int', comment: '体重' })
  weight: number;

  @Column({ type: 'varchar', comment: '真实姓名' })
  real_name: string;

  @Column({ type: 'varchar', nullable: true, comment: '联系电话', length: 11 })
  phone?: string;

  @Column({ type: 'varchar', nullable: true, comment: '电子邮件', length: 20 })
  email?: string;

  @Column({ type: 'varchar', comment: '省份', length: 10 })
  province: string;

  @Column({ type: 'varchar', comment: '城市', length: 10 })
  city: string;

  @Column({ type: 'varchar', comment: '详细地址', length: 40 })
  address: string;

  @Column({ type: 'varchar', comment: '身份证号', length: 18 })
  card_id: string;

  @Column({ type: 'varchar', comment: '民族', length: 10 })
  nation: string;

  @OneToOne(() => AvatarsEntity, (avatar) => avatar.user)
  avatar: AvatarsEntity;

  @OneToMany(() => HospitalEntity, (hospital) => hospital.user)
  hospitals: HospitalEntity[];

  @OneToMany(() => InspectorEntity, (inspector) => inspector.user)
  inspectors: InspectorEntity[];

  @OneToMany(() => DoctorEntity, (doctor) => doctor.user)
  doctors: DoctorEntity[];
}
