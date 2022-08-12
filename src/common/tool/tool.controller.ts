import { Controller, Post } from '@nestjs/common';
import { ToolService } from './tool.service';

@Controller('tool')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Post('/build')
  generateJenkinsfile() {
    console.log('generateJenkinsfile');
  }
}
