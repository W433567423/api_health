import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddIndicatorReqDto {
  @ApiProperty({ description: '检测项目', example: '空腹血糖' })
  @IsNotEmpty({ message: '检测项目不能为空' })
  readonly inspection_name: string;

  @ApiProperty({ description: '英文简称', example: 'GLU' })
  readonly abbreviation?: string;

  @ApiProperty({ description: '检测结果', example: '4.81' })
  @IsNotEmpty({ message: '检测结果不能为空' })
  readonly inspection_result: string;

  @ApiProperty({ description: '检测时间', example: '1735660800' })
  @IsNotEmpty({ message: '检测时间不能为空' })
  readonly inspection_time: string;

  @ApiProperty({ description: '检测方法', example: '生化' })
  readonly inspection_method?: string;

  @ApiProperty({ description: '单位', example: 'umol/L' })
  readonly unit?: string;

  @ApiProperty({ description: '最小参考值', example: '3.33' })
  readonly min?: string;

  @ApiProperty({ description: '最大参考值', example: '6.11' })
  readonly max?: string;

  @ApiProperty({ description: '检验号', example: '252100505558' })
  readonly inspection_num?: string;

  @ApiProperty({ description: '样本编号', example: '55021' })
  readonly sample_num?: string;

  @ApiProperty({ description: '样本类型', example: '血清' })
  readonly sample_type?: string;

  @ApiProperty({ description: '申请医师', example: 1 })
  @IsNotEmpty({ message: '申请医师不能为空' })
  readonly apply_docker_id: number;

  @ApiProperty({ description: '检验医师', example: 1 })
  @IsNotEmpty({ message: '检验医师不能为空' })
  readonly inspection_docker_id: number;

  @ApiProperty({ description: '审核医师', example: 1 })
  @IsNotEmpty({ message: '审核医师不能为空' })
  readonly audit_docker_id: number;
}
