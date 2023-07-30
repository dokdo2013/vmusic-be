import { ApiProperty } from '@nestjs/swagger';

export class CreateMusicDto {
  @ApiProperty({
    description: 'Music title',
    example: '도연 - 노래',
  })
  name: string;

  @ApiProperty({
    description: 'Music author id',
    example: 1,
  })
  author_id: number;

  @ApiProperty({
    description: 'Music description',
    example: '도연이 부른 노래입니다.',
  })
  description: string;

  @ApiProperty({
    description: 'Music thumbnail image url',
    example:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/0f0f0f0f0f0f0f0f-profile_image-300x300.png',
  })
  cover_image_url: string;
}
