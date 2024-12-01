import { TimeEntity } from '@/modules/app/entities/app.entity';
import { DoctorEntity } from '@/modules/doctor/entities/doctor.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hospital')
export class HospitalEntity extends TimeEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '医院id' })
  id: number;

  @Column({ type: 'varchar', comment: '医院名字', length: 20 })
  hospitalName: string;

  @Column({ type: 'varchar', comment: '区域码', length: 6 })
  addressCode: string;

  @Column({ type: 'varchar', comment: '别名', length: 20, nullable: true })
  alias: string;

  @Column({ type: 'varchar', comment: '级别', length: 6 })
  level: string;

  @Column({ type: 'varchar', comment: '医院性质', length: 10, nullable: true })
  nature: string;

  @OneToMany(() => DoctorEntity, (doctor) => doctor.hospital)
  doctors: DoctorEntity[];

  @Column({ type: 'int', comment: '用户id' })
  user_id: number;
}
