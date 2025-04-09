import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';
import { HttpInterceptor } from './interceptors/http.interceptor';
import { HttpService } from '@nestjs/axios';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const originAllowed = configService.get<string>('REACT_DOMAIN_ENABLE');
  const globalPrefix = configService.get<string>('API_PREFIX');
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: [originAllowed],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
  });
  const httpService = app.get(HttpService);
  app.useGlobalInterceptors(new HttpInterceptor(httpService));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
