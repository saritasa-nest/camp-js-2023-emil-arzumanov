import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

import { AuthService } from './auth.service';

/** Authorization guard for profile. */
@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {

	private readonly auth = inject(AuthService);

	private readonly router = inject(Router);

	private readonly authService = inject(AuthService);

	/** @inheritdoc */
	public canActivate(): Observable<boolean | UrlTree> {
		return this.authService.isLoggedIn$
			.pipe(
				map(elem => {
					if (elem) {
						return true;
					}
					return this.router.createUrlTree(['/home/login']);
				}),
			);
	}
}
