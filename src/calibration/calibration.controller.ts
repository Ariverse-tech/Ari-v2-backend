import { Body, Controller, Post } from '@nestjs/common';
import { CalibrationService } from './calibration.service';
import { StartCalibrationDto } from './dto/startCalibration.dto';
import { CalibrationFrameDto } from './dto/frame.dto';

@Controller('calibration')
export class CalibrationController {
  constructor(private readonly service: CalibrationService) {}

  @Post('start')
  start(@Body() dto: StartCalibrationDto) {
    return this.service.startSession(dto.user_id);
  }

  @Post('frame')
  frame(@Body() dto: CalibrationFrameDto) {
    return this.service.addFrame(dto);
  }

  @Post('complete')
  OfflineAudioCompletionEvent(@Body('session') session_id: string) {
    return this.service.completeSession(session_id);
  }
}
