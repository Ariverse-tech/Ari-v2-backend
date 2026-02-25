import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { CalibrationFrame } from './calibrationFrame.entity';

@Entity('calibration_sessions')
export class CalibrationSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  started_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  completed_at: Date | null;

  @OneToMany(() => CalibrationFrame, (frame) => frame.session)
  frames: CalibrationFrame[];
}
