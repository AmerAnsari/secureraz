import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HttpErrorResponseApi } from 'src/app/models/http-error-response-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector,
              private authService: AuthService) {
  }

  /**
   * Modify headers and error handling.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /**
     * Add authorization to headers
     */
    if (request.url.includes(environment.api)) {
      /**
       * Get token from localstorage and if there was a token then send it to the request.
       */
      const token: string = this.authService.getToken();
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `JWT ${token}`,
          },
        });
      }
    }
    /**
     * Error handling.
     */
    return next.handle(request).pipe(catchError((httpErrorResponse: HttpErrorResponse): Observable<never> => {
      /**
       * Convert error response
       */
      const error: HttpErrorResponseApi = new HttpErrorResponseApi(httpErrorResponse);
      /**
       * Handle error status cases
       */
      switch (error.status) {
        case 401: {
          // Get the auth header from the service.
          const auth: AuthService = this.injector.get(AuthService);
          auth.signOut();
          break;
        }
      }
      /**
       * Return the error
       */
      return throwError(error);
    }));
  }
}
