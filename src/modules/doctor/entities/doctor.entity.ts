import { TimeEntity } from '@/modules/app/entities/app.entity';
import { Column, Entity } from 'typeorm';

@Entity('doctor')
export class DoctorEntity extends TimeEntity {
  @Column({ type: 'varchar', comment: '医生名字', length: 20 })
  doctorName: string;

  @Column({ type: 'varchar', comment: '性别', length: 1, nullable: true })
  six?: string;

  @Column({ type: 'varchar', comment: '职位', length: 10, nullable: true })
  post?: string;

  @Column({ type: 'int', comment: '医院id' })
  hospitalId: number;

  @Column({ type: 'int', comment: '用户id' })
  userId: number;
}
