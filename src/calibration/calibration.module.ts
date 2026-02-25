import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalibrationController } from './calibration.controller';
import { CalibrationService } from './calibration.service';
import { CalibrationSession } from './entities/calibrationSession.entity';
import { CalibrationFrame } from './entities/calibrationFrame.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CalibrationSession, CalibrationFrame])],
  controllers: [CalibrationController],
  providers: [CalibrationService],
})
export class CalibrationModule {}
