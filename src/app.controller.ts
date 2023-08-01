import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({
    summary: '서버 상태 확인',
    description: '서버 상태를 확인합니다.',
  })
  getHello(): string {
    return 'ok';
  }
}
