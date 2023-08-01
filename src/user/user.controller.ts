import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  @Get('')
  @ApiOperation({
    summary: '현재 로그인된 유저 정보 조회',
    description: '현재 로그인된 유저 정보를 조회합니다.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Req() req: any) {
    const user = req.user;
    console.log(user);

    return await this.userService.getUser(user.id);
  }

  @Get('twitch')
  @ApiOperation({
    summary: 'Twitch 로그인',
    description: 'Twitch 로그인을 진행합니다.',
  })
  @ApiQuery({
    name: 'path',
    description: '로그인 후 리다이렉트할 경로',
    type: String,
    required: false,
  })
  redirectTwitch(@Query('path') path: string, @Res() res: any) {
    const url = this.userService.generateTwitchLoginUrl(path);

    res.redirect(url);
  }

  @Get('twitch/callback')
  @ApiOperation({
    summary: 'Twitch 로그인 콜백',
    description: 'Twitch 로그인 콜백으로 넘어온 정보를 처리합니다.',
  })
  async twitchCallback(@Query() query: any, @Res() res: any) {
    return await this.userService.twitchCallback(query, res);
  }

  @Get('logout')
  @ApiOperation({
    summary: '로그아웃',
    description: '로그아웃을 진행합니다.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  logout(@Res() res: any) {
    res.clearCookie('jwt');

    const FRONTEND_HOST =
      this.configService.get<string>('FRONTEND_HOST') ||
      'http://localhost:3000';

    res.redirect(FRONTEND_HOST);
  }
}
