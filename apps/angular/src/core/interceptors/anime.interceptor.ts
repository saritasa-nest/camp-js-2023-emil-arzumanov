import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

/** Interceptor for AnimeService. */
@Injectable()
export class ApiKeyInterceptor<T> implements HttpInterceptor {
	/**
	 * Intercepts request and adds headers.
	 * @param req Request that we are intercepting.
	 * @param next Next handler.
	 */
	public intercept(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
		/**
		 * Clones the request and replace the original headers with
		 * cloned headers, updated with the authorization.
		 */
		const modifiedReq = req.clone({
			setHeaders: {
				'Api-Key': '9c9da0d3-c65c-402b-8df6-4a04ad9fa847',
			},
		});

		/**
		 * Sends cloned request with header to the next handler.
		 */
		return next.handle(modifiedReq);
	}
}
