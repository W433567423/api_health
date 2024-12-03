import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddDoctorReqDto {
  @ApiProperty({ description: '医生性名', example: 'test' })
  @IsNotEmpty({ message: '医生性名不能为空' })
  readonly doctorName: string;

  @ApiProperty({
    description: '性别',
    example: '男',
  })
  readonly six?: string;

  @ApiProperty({
    description: '职位',
    example: '普通医生',
  })
  @IsNotEmpty({ message: '职位不能为空' })
  readonly post: string;

  @ApiProperty({
    description: '医院id',
    example: 1,
  })
  @IsNotEmpty({ message: '医院id不能为空' })
  readonly hospitalId: number;
}
