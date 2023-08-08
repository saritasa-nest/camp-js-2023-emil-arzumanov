import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import { AuthService } from './auth.service';

/** Authorization guard for logged user. */
@Injectable({
	providedIn: 'root',
})
export class LoggedAuthGuard implements CanActivate {

	private readonly auth = inject(AuthService);

	private readonly router = inject(Router);

	private readonly authService = inject(AuthService);

	/** @inheritdoc */
	public canActivate(): Observable<boolean> {
		return this.authService.isLoggedIn$
			.pipe(
				map(elem => {
					if (elem) {
						this.router.navigate(['/home/profile']);
						return false;
					}
					return true;
				}),
			);
	}
}
