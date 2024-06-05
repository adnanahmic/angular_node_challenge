import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return next.handle(modifiedRequest);
    }
    return next.handle(request);
  }
}
