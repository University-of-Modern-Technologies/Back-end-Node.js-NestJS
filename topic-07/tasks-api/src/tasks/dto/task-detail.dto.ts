import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class TaskDetailDto {
  @ApiProperty({ example: 'Детальний опис того, що треба зробити' })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    example: 'https://example.com/materials',
    nullable: true,
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  materialsUrl?: string;
}
