import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios'; 

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  constructor(private readonly httpService: HttpService) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = _context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (token) {
      this.httpService.axiosRef.defaults.headers['Authorization'] = token;
    }

    return next.handle().pipe(
      map((response: AxiosResponse) => response),
      catchError((error: AxiosError) => {
        const responseError = error.response?.data || error.response;
        throw new HttpException(responseError, error.response?.status || 500);
      })
    );
  }
}
