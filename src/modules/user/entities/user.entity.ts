import { TimeEntity } from '@/modules/app/entities/app.entity';
import { AvatarsEntity } from '@/modules/file/entities/avatar.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity extends TimeEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'string', comment: '用户名', length: 20 })
  user_name: string;

  @Column({ type: 'string', comment: '密码(加密后)', length: 20 })
  password: string;

  @Column({ type: 'string', comment: '性别', length: 6 })
  six: string;

  @Column({ type: 'string', comment: '出生日期', length: 6 })
  birthday: string;

  @Column({ type: 'number', comment: '身高' })
  height: number;

  @Column({ type: 'varchar', comment: '体重' })
  weight: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createTime: Date;

  @Column({ type: 'varchar', nullable: true, comment: '联系电话' })
  phone?: string;

  @Column({ type: 'varchar', comment: '电子邮件' })
  email: string;

  @Column({ type: 'varchar', comment: '平安的cookie', nullable: true })
  peace: string;

  @OneToOne(() => AvatarsEntity, (avatar) => avatar.user)
  @JoinColumn()
  avatar: AvatarsEntity;
}
