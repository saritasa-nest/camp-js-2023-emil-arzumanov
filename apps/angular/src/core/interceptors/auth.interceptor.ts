import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@js-camp/angular/environments/environment';

/** Auth interceptor. Intercepts request and adds JWT token to headers. */
@Injectable()
export class AuthInterceptor<T> implements HttpInterceptor {
	/** @inheritdoc */
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
