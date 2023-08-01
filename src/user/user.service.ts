import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { User } from './entities/user.entity';
import { UserTwitch } from './entities/user-twitch.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(UserTwitch)
    private readonly userTwitchModel: typeof UserTwitch,
  ) {}

  async getUser(id: string): Promise<any> {
    const user = await this.userModel.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('해당하는 유저가 없습니다.');
    }

    const providerUser = await this.userTwitchModel.findOne({
      where: { user_id: id },
    });

    if (!providerUser) {
      throw new NotFoundException('해당하는 유저가 없습니다.');
    }

    return {
      user,
      providerUser,
    };
  }

  generateTwitchLoginUrl(path: string): string {
    const clientId = this.configService.get<string>('TWITCH_CLIENT_ID');
    const redirectUri = this.configService.get<string>('TWITCH_REDIRECT_URI');

    const url = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=user:read:email`;

    if (path) {
      return `${url}&state=${path}`;
    }

    return url;
  }

  async twitchCallback(query: any, res: any): Promise<any> {
    const { code } = query;

    const clientId = this.configService.get<string>('TWITCH_CLIENT_ID');
    const clientSecret = this.configService.get<string>('TWITCH_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('TWITCH_REDIRECT_URI');

    const url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${redirectUri}`;

    const response = await axios.post(url);
    const { access_token, refresh_token } = response.data;

    const user = await axios.get('https://api.twitch.tv/helix/users', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Client-Id': clientId,
      },
    });

    const { id, login, display_name, profile_image_url, broadcaster_type } =
      user.data.data[0];

    const userTwitch = await this.userTwitchModel.findOne({
      where: { id },
    });

    let user_id;
    if (userTwitch) {
      await this.userTwitchModel.update(
        {
          twitch_name: login,
          twitch_display_name: display_name,
          profile_image_url,
          broadcaster_type,
          twitch_access_token: access_token,
          twitch_refresh_token: refresh_token,
        },
        { where: { id } },
      );

      const user = await this.userModel.findOne({
        where: { id: userTwitch.user_id },
      });

      user_id = user.id;
    } else {
      const user = await this.userModel.create({
        provider: 'twitch',
        name: display_name,
      });

      user_id = user.id;

      await this.userTwitchModel.create({
        id: Number(id),
        user_id: user.id,
        twitch_name: login,
        twitch_display_name: display_name,
        profile_image_url,
        broadcaster_type,
        twitch_access_token: access_token,
        twitch_refresh_token: refresh_token,
      });
    }

    // user 정보를 이용해 JWT를 생성한다.
    const token = this.jwtService.sign({
      id: user_id,
      provider: 'twitch',
      provider_id: id,
      name: login,
      displayName: display_name,
      accessToken: access_token,
    });

    // JWT를 이용해 로그인 처리를 한다.
    const FRONTEND_HOST =
      this.configService.get<string>('FRONTEND_HOST') ||
      'http://localhost:3000';

    let cookieDomain;
    if (FRONTEND_HOST === 'http://localhost:3000') {
      cookieDomain = 'localhost';
    } else {
      cookieDomain = 'vmusic.kr';
    }
    console.log('cookieDomain', cookieDomain);

    // const cookie = `jwt=${token}; Max-Age=7200; HttpOnly; Path=/; SameSite=Strict; Secure; Domain=${cookieDomain}}`;
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 7200000),
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: true,
      domain: cookieDomain,
    });

    // if state exists, redirect to state
    let frontendRedirectUrl = `${FRONTEND_HOST}/`;

    if (query.state) {
      frontendRedirectUrl = `${FRONTEND_HOST}${query.state}`;
    }

    return res.redirect(frontendRedirectUrl);
  }
}
