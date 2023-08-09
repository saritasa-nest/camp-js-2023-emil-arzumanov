import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

/** Auth interceptor. Intercepts request and adds JWT token to headers. */
@Injectable()
export class RefreshTokenInterceptor<T> implements HttpInterceptor {

	private readonly authService = inject(AuthService);

	/** @inheritdoc */
	public intercept(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
		return next.handle(req).pipe(
			catchError((error: unknown) => {
				if (error instanceof HttpErrorResponse && (error.status === 401 || error.message.includes('401'))) {
					return this.handleTokenError(req, next);
				}

				return throwError(() => error);
			}),
		);
	}

	/**
	 * Refresh token or logout, if refresh doesn't work.
	 * @param request Request.
	 * @param next Next handler.
	 */
	private handleTokenError(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
		return this.authService.isLoggedIn$
			.pipe(
				switchMap(elem => {
					if (elem) {
						return this.authService.refreshToken().pipe(
							switchMap(() => next.handle(request)),
							catchError((error: unknown) => {
								if (error instanceof HttpErrorResponse && (error.status === 403 || error.message.includes('403'))) {
									this.authService.logout();
								}
								return throwError(() => error);
							}),
						);
					}
					return next.handle(request);
				}),
			);
	}
}
