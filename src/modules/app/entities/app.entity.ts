import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TimeEntity extends BaseEntity {
  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  create_time: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新时间',
  })
  update_time: Date;
}
