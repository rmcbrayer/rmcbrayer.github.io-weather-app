import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const headers = req.headers;

  // Direct the http request to the Open Weather Maps Url
  if (headers.has('weather')) {
    let params = new HttpParams({ fromString: req.params.toString() });
    params.set('appid', environment.weatherApiKey);

    const apiReq = req.clone({
      url: `${environment.weatherApiUrl}/${environment.weatherApiTarget}/${req.url}`,
      headers: req.headers.delete('weather'),
      params: params
    });
    
    return next(apiReq);
  }

  // Else, do not redirect the Url
  return next(req);
};
