import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './../app/app.controller';
import { AppService } from './../app/app.service';
import { AuthModule } from './../auth/auth.module';
import { GlobalModule } from './../global.module';
import { HttpInterceptor } from './../../interceptors/http.interceptor';
import { TokenValidationMiddleware } from './../../middleware/authorization';
import { CompaniesModule } from './../companies/companies.module';
import { DbModule } from './../db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    DbModule,
    GlobalModule,
    CompaniesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'HTTP_INTERCEPTOR',
      useClass: HttpInterceptor
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenValidationMiddleware).exclude('auth/login').forRoutes('*');
  }
}
