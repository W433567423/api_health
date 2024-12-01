import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddHospitalReqDto {
  @ApiProperty({ description: '医院名', example: 'test' })
  @IsNotEmpty({ message: '医院名不能为空' })
  readonly hospitalName: string;

  @ApiProperty({
    description: '别名',
    example: 'test',
  })
  readonly alias?: string;

  @ApiProperty({
    description: '级别',
    example: '三级甲等',
  })
  @IsNotEmpty({ message: '级别不能为空' })
  readonly level: string;

  @ApiProperty({
    description: '医院性质',
    example: '公立',
  })
  readonly nature?: string;

  @ApiProperty({
    description: '地区码',
    example: '421127',
  })
  @IsNotEmpty({ message: '地区码不能为空' })
  readonly addressCode: string;
}
