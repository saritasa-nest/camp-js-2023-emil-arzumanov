import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@js-camp/angular/environments/environment';

import { AppUrlsConfig } from '../services/url-config.service';

const ACCESS = environment.accessToken;

/** Auth interceptor. Intercepts request and adds JWT token to headers. */
@Injectable()
export class AuthInterceptor<T> implements HttpInterceptor {

	/** @inheritdoc */
	public intercept(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {

		const appUrlsConfig = inject(AppUrlsConfig);

		const animeListUrl = appUrlsConfig.toApi('anime', 'anime');

		if (req.url.search(animeListUrl) === -1) {
			const modifiedReq = req.clone({
				setHeaders: {
					Authorization: `Bearer ${localStorage.getItem(ACCESS)}`,
				},
			});
			return next.handle(modifiedReq);
		}
		return next.handle(req);
	}
}
