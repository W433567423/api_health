import { TimeEntity } from '@/modules/app/entities/app.entity';
import { HospitalEntity } from '@/modules/hospital/entities/hospital.entity';
import { IndicatorEntity } from '@/modules/indicator/entities/indicator.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reviewer')
export class ReviewerEntity extends TimeEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '审核者id' })
  id: number;

  @Column({ type: 'varchar', comment: '审核者名字', length: 20 })
  reviewer_name: string;

  @Column({ type: 'varchar', comment: '性别', length: 1, nullable: true })
  six?: string;

  @ManyToOne(() => HospitalEntity, (hospital) => hospital.reviewers)
  @JoinColumn({ name: 'hospital_id' })
  hospital: HospitalEntity;

  @ManyToOne(() => UserEntity, (user) => user.reviewers)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => IndicatorEntity, (indicator) => indicator.reviewer)
  indicators: IndicatorEntity[];
}
