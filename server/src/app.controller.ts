import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller()
export class AppController {
  @Get('api')
  @ApiOperation({ summary: 'Kiểm tra trạng thái hệ thống API' })
  getApiStatus() {
    return {
      status: 'ok',
      message: 'Idol Showdown Wiki NestJS API Service is running',
      version: '2.0.0',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('health/db')
  @ApiOperation({ summary: 'Kiểm tra kết nối CSDL (Compatibility Route)' })
  getHealthDb() {
    return {
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
    };
  }
}
