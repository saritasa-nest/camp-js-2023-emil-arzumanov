import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@js-camp/angular/environments/environment';

/** Interceptor for AnimeService. */
@Injectable()
export class ApiKeyInterceptor<T> implements HttpInterceptor {
	/**
	 * Intercepts request and adds headers.
	 * @param req Request that we are intercepting.
	 * @param next Next handler.
	 */
	public intercept(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
		const modifiedReq = req.clone({
			setHeaders: {
				'Api-Key': environment.apiKey,
			},
		});

		/**
		 * Sends cloned request with header to the next handler.
		 */
		return next.handle(modifiedReq);
	}
}
