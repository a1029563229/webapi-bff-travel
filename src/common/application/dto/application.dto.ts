import { IsNotEmpty } from 'class-validator';

export class AddApplicationDto {
  @IsNotEmpty({ message: '应用名称不能为空' })
  name: string;

  @IsNotEmpty({ message: '应用code不能为空' })
  code: string;

  @IsNotEmpty({ message: '应用类型不能为空' })
  type: string;

  networks: string;
}

export class UpdateApplicationDto extends AddApplicationDto {
  @IsNotEmpty({ message: '应用 ID 不能为空' })
  id: string;
}

export class QueryOneApplicationDto {
  @IsNotEmpty({ message: '应用 ID 不能为空' })
  id: string;
}
