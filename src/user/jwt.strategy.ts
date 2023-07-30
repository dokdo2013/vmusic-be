import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
require('dotenv').config();

const ExtractJwtFromAuthHeader = ExtractJwt.fromAuthHeaderAsBearerToken();

const ExtractJwtFromCookie = (cookie_name: string) => (request: Request) => {
  let token = ExtractJwtFromAuthHeader(request);
  if (token) {
    delete request.cookies[cookie_name];
  } else if (request.cookies && request.cookies[cookie_name]) {
    token = request.cookies[cookie_name] as string;
  }
  return token;
};

interface JwtPayload {
  id: number;
  name: string;
  provider: string;
  providerId: string;
  displayName: string;
  accessToken: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwtFromCookie('jwt'),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<JwtPayload> {
    return {
      id: parseInt(payload.id),
      name: payload.name,
      provider: payload.provider,
      providerId: payload.providerId,
      displayName: payload.displayName,
      accessToken: payload.accessToken,
    };
  }
}
