import { TimeEntity } from '@/modules/app/entities/app.entity';
import { Column, Entity } from 'typeorm';

@Entity('hospital')
export class HospitalEntity extends TimeEntity {
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

  @Column({ type: 'int', comment: '用户id' })
  userId: number;
}
