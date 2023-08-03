import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@js-camp/angular/environments/environment';

import { AppUrlsConfig } from '../services/url-config.service';
import { StorageService } from '../services/storage.service';

/** Auth interceptor. Intercepts request and adds JWT token to headers. */
@Injectable()
export class AuthInterceptor<T> implements HttpInterceptor {

	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly storageService = inject(StorageService);

	/** @inheritdoc */
	public intercept(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
		const animeListUrl = this.appUrlsConfig.toApi('anime', 'anime');

		const accessToken = this.storageService.getValue(environment.accessTokenName);

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
