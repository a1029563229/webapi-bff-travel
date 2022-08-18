import { Module } from '@nestjs/common';
import { ApplicationService } from '../application/application.service';
import { ToolController } from './tool.controller';
import { ToolService } from './tool.service';

@Module({
  controllers: [ToolController],
  providers: [ToolService, ApplicationService],
})
export class ToolModule {}
