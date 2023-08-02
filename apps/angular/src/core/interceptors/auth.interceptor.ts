import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppUrlsConfig } from '../services/url-config.service';

/** Auth interceptor. Intercepts request and adds JWT token to headers. */
@Injectable()
export class AuthInterceptor<T> implements HttpInterceptor {

	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly accessTokenName = 'access_token';

	/** @inheritdoc */
	public intercept(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
		const animeListUrl = this.appUrlsConfig.toApi('anime', 'anime');

		const accessToken = localStorage.getItem(this.accessTokenName);

		if (req.url.includes(animeListUrl) && accessToken) {
			const modifiedReq = req.clone({
				setHeaders: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			return next.handle(modifiedReq);
		}

		return next.handle(req);
	}
}
