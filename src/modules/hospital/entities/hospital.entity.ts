import { TimeEntity } from '@/modules/app/entities/app.entity';
import { DoctorEntity } from '@/modules/doctor/entities/doctor.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hospital')
export class HospitalEntity extends TimeEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '医院id' })
  id: number;

  @Column({ type: 'varchar', comment: '医院名字', length: 20 })
  hospital_name: string;

  @Column({ type: 'varchar', comment: '省份', length: 20 })
  province: string;

  @Column({ type: 'varchar', comment: '城市', length: 6 })
  city: string;

  @Column({ type: 'varchar', comment: '别名', length: 6 })
  alias: string;

  @Column({ type: 'varchar', comment: '级别', length: 6 })
  level: string;

  @OneToMany(() => DoctorEntity, (doctor) => doctor.hospital)
  doctors: DoctorEntity[];

  @Column({ type: 'int', comment: '用户id' })
  user_id: number;
}
