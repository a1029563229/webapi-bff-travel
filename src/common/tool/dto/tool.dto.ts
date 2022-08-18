import { IsNotEmpty } from 'class-validator';

export class AppInfo {
  @IsNotEmpty({ message: 'app code 不能为空' })
  appCode: string;

  env: string;
}
