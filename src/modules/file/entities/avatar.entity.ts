import { TimeEntity } from '@/modules/app/entities/app.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('avatar')
export class AvatarsEntity extends TimeEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', comment: '远程文件地址' })
  fileUrl: string;

  @Column({
    type: 'varchar',
    name: 'mimetype',
    comment: '文件类型',
  })
  mimetype: string;

  @Column({
    type: 'varchar',
    name: 'size',
    comment: '文件大小(bit)',
  })
  size: string;

  @OneToOne(() => UserEntity, (user) => user.avatar)
  user: UserEntity;
}
