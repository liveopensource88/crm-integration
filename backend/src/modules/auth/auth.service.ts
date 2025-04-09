import { Injectable } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AxiosError } from 'axios';
import { IGenerateTokenResponse, ILogoutResponse, IProfileResponse } from './auth.types';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  login(loginDto: LoginDto): Observable<IGenerateTokenResponse> {
    const { email, password } = loginDto;

    return this.httpService.post('auth/login', { email, password }).pipe(
      map(response => response.data),
      catchError((error: AxiosError) => {
        return throwError(() => error);
      })
    );
  }
  profile(): Observable<IProfileResponse> {
    return this.httpService.get('profile').pipe(
      map(response => response.data),
      catchError((error: AxiosError) => {
        return throwError(() => error);
      })
    );
  }
  logout(): Observable<ILogoutResponse> {
    return this.httpService.post('auth/logout').pipe(
      map(response => response.data),
      catchError((error: AxiosError) => {
        return throwError(() => error);
      })
    );
  }
  refreshToken(): Observable<IGenerateTokenResponse> {
    return this.httpService.post('auth/refresh').pipe(
      map(response => response.data),
      catchError((error: AxiosError) => {
        return throwError(() => error);
      })
    );
  }
}
