import { ApiProperty } from '@nestjs/swagger';

export class CreateCreatorDto {
  @ApiProperty({
    description: 'Creator name',
    example: '도연',
  })
  name: string;

  @ApiProperty({
    description: 'Creator profile image url',
    example:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/0f0f0f0f0f0f0f0f-profile_image-300x300.png',
  })
  profile_image_url: string;
}
