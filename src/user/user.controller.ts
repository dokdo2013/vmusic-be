import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Req() req: any) {
    const user = req.user;
    console.log(user);

    return await this.userService.getUser(user.id);
  }

  @Get('twitch')
  redirectTwitch(@Res() res: any) {
    const url = this.userService.generateTwitchLoginUrl();

    res.redirect(url);
  }

  @Get('twitch/callback')
  async twitchCallback(@Query() query: any, @Res() res: any) {
    return await this.userService.twitchCallback(query, res);
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res() res: any) {
    res.clearCookie('jwt');

    const FRONTEND_HOST =
      this.configService.get<string>('FRONTEND_HOST') ||
      'http://localhost:3000';

    res.redirect(FRONTEND_HOST);
  }
}
