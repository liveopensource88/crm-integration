import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('SYSTEM_BASE_URL'),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }),
      inject: [ConfigService]
    })
  ],
  exports: [HttpModule]
})
export class GlobalModule {}
