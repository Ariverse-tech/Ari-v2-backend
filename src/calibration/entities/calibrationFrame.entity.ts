import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CalibrationSession } from './calibrationSession.entity';
import { session } from 'passport';

@Entity('calibration_frames')
export class CalibrationFrame {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CalibrationSession, (session) => session.frames, {
    onDelete: 'CASCADE',
  })
  session: CalibrationSession;

  @Column('float')
  target_x: number;

  @Column('float')
  target_y: number;

  @Column('float')
  gaze_x: number;

  @Column('float')
  gaze_y: number;

  @Column('timestamptz')
  timestamp: Date;
}
