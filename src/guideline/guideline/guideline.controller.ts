import { Controller, Get, Post } from '@nestjs/common';
import { GuidelineService } from './guideline.service';

@Controller('guideline')
export class GuidelineController {
  private constructor(private readonly guidelineService: GuidelineService) {}

  @Get('list')
  getGuidelineList(data: any) {
    return this.guidelineService.getGuidelineList(data);
  }

  @Post('add')
  addGuideline(data: any) {
    return this.guidelineService.addGuideline(data);
  }

  @Post('delete')
  deleteGuideline(data: any) {
    return this.guidelineService.deleteGuideline(data);
  }
}
