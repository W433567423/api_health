import { TimeEntity } from '@/modules/app/entities/app.entity';
import { Column, Entity } from 'typeorm';

@Entity('doctor')
export class DoctorEntity extends TimeEntity {
  @Column({ type: 'varchar', comment: '医生名字', length: 20 })
  doctor_name: string;

  @Column({ type: 'varchar', comment: '性别', length: 1, nullable: true })
  six?: string;

  @Column({ type: 'int', comment: '医院id' })
  hospital_id: number;

  @Column({ type: 'int', comment: '用户id' })
  user_id: number;
}
