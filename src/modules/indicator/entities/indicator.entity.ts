import { TimeEntity } from '@/modules/app/entities/app.entity';
import { Column, CreateDateColumn, Entity } from 'typeorm';

@Entity('indicator')
export class IndicatorEntity extends TimeEntity {
  @Column({ type: 'varchar', comment: '检测项目', length: 20 })
  inspection_name: string;

  @Column({ type: 'varchar', comment: '英文缩写', length: 20, nullable: true })
  abbreviation: string;

  @Column({ type: 'varchar', comment: '结果', length: 20 })
  inspection_result: string;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '检测时间(s)',
  })
  inspection_time: Date;

  @Column({ type: 'varchar', comment: '检测方法', length: 20, nullable: true })
  inspection_method: string;

  @Column({ type: 'varchar', comment: '单位', length: 10 })
  unit: string;

  @Column({
    type: 'varchar',
    comment: '参考最小值',
    length: 20,
    nullable: true,
  })
  mix: string;

  @Column({
    type: 'varchar',
    comment: '单位最大值',
    length: 20,
    nullable: true,
  })
  max: string;

  @Column({ type: 'varchar', comment: '检验号', length: 20, nullable: true })
  inspection_num: string;

  @Column({ type: 'varchar', comment: '样本编号', length: 20, nullable: true })
  sample_num: string;

  @Column({ type: 'varchar', comment: '样本类型', length: 20, nullable: true })
  sample_type: string;

  @Column({ type: 'int', comment: '用户id' })
  user_id: number;

  @Column({ type: 'int', comment: '医院id' })
  hospital_id: number;

  @Column({ type: 'int', comment: '申请者' })
  apply_docker_id: number;

  @Column({ type: 'int', comment: '检验者' })
  inspection_docker_id: number;

  @Column({ type: 'int', comment: '审核者' })
  review_docker_id: number;
}
