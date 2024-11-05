import { TimeEntity } from '@/modules/app/entities/app.entity';
import { HospitalEntity } from '@/modules/hospital/entities/hospital.entity';
import { IndicatorEntity } from '@/modules/indicator/entities/indicator.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('doctor')
export class DoctorEntity extends TimeEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '医生id' })
  id: number;

  @Column({ type: 'varchar', comment: '医生名字', length: 20 })
  doctor_name: string;

  @Column({ type: 'varchar', comment: '性别', length: 1 })
  six: string;

  @ManyToOne(() => HospitalEntity, (hospital) => hospital.doctors)
  @JoinColumn({ name: 'hospital_id' })
  hospital: HospitalEntity;

  @ManyToOne(() => UserEntity, (user) => user.doctors)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => IndicatorEntity, (indicator) => indicator.doctor)
  indicators: IndicatorEntity[];
}
