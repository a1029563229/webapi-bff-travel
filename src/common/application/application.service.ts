import { Injectable } from '@nestjs/common';
import { AddApplicationDto } from './dto/application.dto';

@Injectable()
export class ApplicationService {
  addApplication(addApplicationDto: AddApplicationDto) {}
}
