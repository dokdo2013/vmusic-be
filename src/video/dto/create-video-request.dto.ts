import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoRequestDto {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  user_id: number;

  @ApiProperty({
    description: 'Video request title',
    example: 'youtube',
  })
  title: string;

  @ApiProperty({
    description: 'Video request contents',
    example: 'youtube',
  })
  contents: string;
}
