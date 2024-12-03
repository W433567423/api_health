import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TimeEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: 'id' })
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间(s)',
  })
  create_time: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新时间(s)',
  })
  update_time: Date;
}
