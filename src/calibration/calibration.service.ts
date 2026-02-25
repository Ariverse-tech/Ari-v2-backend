import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalibrationSession } from './entities/calibrationSession.entity';
import { CalibrationFrame } from './entities/calibrationFrame.entity';
import { CalibrationFrameDto } from './dto/frame.dto';

@Injectable()
export class CalibrationService {
  constructor(
    @InjectRepository(CalibrationSession)
    private sessionRepo: Repository<CalibrationSession>,

    @InjectRepository(CalibrationFrame)
    private frameRepo: Repository<CalibrationFrame>,
  ) {}

  async startSession(user_id: string) {
    const session = this.sessionRepo.create({ user_id });
    return this.sessionRepo.save(session);
  }

  async addFrame(dto: CalibrationFrameDto) {
    const session = await this.sessionRepo.findOne({
      where: { id: dto.session_id },
    });

    if (!session) throw new NotFoundException('Session not found');

    const frame = this.frameRepo.create({
      session,
      target_x: dto.target_x,
      target_y: dto.target_y,
      gaze_x: dto.gaze_x,
      gaze_y: dto.gaze_y,
      timestamp: new Date(dto.timestamp),
    });
    return this.frameRepo.save(frame);
  }

  async completeSession(session_id: string) {
    const session = await this.sessionRepo.findOne({
      where: { id: session_id },
    });

    if (!session) throw new NotFoundException('Session not found');

    session.completed_at = new Date();
    return this.sessionRepo.save(session);
  }
}
