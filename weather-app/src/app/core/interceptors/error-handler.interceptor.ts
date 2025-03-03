import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error occurred: ', error);

      if (error.status === 401) {
        console.log('Unauthorized access');
      }
      else if (error.status === 404) {
        console.log('Resource not found');
      }
      else if (error.status === 429 && error.url?.includes(environment.weatherApiUrl)) {
        console.log('API limit exceeded');
      }
      else if (error.status === 500) {
        console.log('Internal server error');
      }

      // Re-throw the error to propagate it to the component
      return throwError(() => error);
    })
  );
};
