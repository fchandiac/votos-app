import { Controller, Get } from '@nestjs/common';
import { AuthAppService } from './auth-app.service';

@Controller()
export class AuthAppController {
  constructor(private readonly authAppService: AuthAppService) {}

  @Get('/health')
  getHello(): string {
    return this.authAppService.health();
  }
}
