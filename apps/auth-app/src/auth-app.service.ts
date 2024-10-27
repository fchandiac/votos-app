import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthAppService {
  health(): string {
    return 'status: ok';
  }
}
