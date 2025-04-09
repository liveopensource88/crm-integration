import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}
  getPing(): string {
    // const host = this.configService.get<string>('SYSTEM_BASE_URL');
    // return host;
    return 'Hello Pong!';
  }
}
