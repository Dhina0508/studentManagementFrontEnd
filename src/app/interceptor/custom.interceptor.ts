import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { constants } from '../constants/constants';
import { environments } from '../environments/environments';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    
    if (
      request.url.includes(environments.APIENDPOINT+constants.ENDPOINTS.LOGIN) ||
      request.url.includes(environments.APIENDPOINT+constants.ENDPOINTS.REGISTER)||
      request.url.includes(environments.APIENDPOINT+constants.ENDPOINTS.EXTERNAL_DATA)
    ) {
      return next.handle(request);
    }
    const access_token = localStorage.getItem('token');
    if (access_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    }
    return next.handle(request);
  }
}
