import { TimeEntity } from '@/modules/app/entities/app.entity';
import { HospitalEntity } from '@/modules/hospital/entities/hospital.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('inspector')
export class InspectorEntity extends TimeEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '检验id' })
  id: number;

  @Column({ type: 'varchar', comment: '检验者名字', length: 20 })
  inspector_name: string;

  @Column({ type: 'varchar', comment: '性别', length: 1 })
  six: string;

  @ManyToOne(() => HospitalEntity, (hospital) => hospital.inspectors)
  @JoinColumn({ name: 'hospital_id' })
  hospital: HospitalEntity;

  @ManyToOne(() => UserEntity, (user) => user.inspectors)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
