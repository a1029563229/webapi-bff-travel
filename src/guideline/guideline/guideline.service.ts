import { Injectable } from '@nestjs/common';
import { guidelineService } from 'src/service';

@Injectable()
export class GuidelineService {
  async getGuidelineList(params: any) {
    return guidelineService.get('/guideline/list', params);
  }

  async deleteGuideline(data: any) {
    return guidelineService.post('/guideline/delete', data);
  }

  async addGuideline(data: any) {
    return guidelineService.post('/guideline/add', data);
  }
}
