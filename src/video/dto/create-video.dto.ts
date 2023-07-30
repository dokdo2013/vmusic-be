import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoDto {
  @ApiProperty({
    description: 'The video provider',
    example: 'youtube',
  })
  provider: string;

  @ApiProperty({
    description: 'The video provider id',
    example: 'youtube',
  })
  provider_id: string;

  @ApiProperty({
    description: 'The video creator id',
    example: 1,
  })
  creator_id: number;

  @ApiProperty({
    description: 'The video title',
    example: 'youtube',
  })
  title: string;

  @ApiProperty({
    description: 'The video description',
    example: 'youtube',
  })
  thumbnail_image_url: string;
}
